
export class ImageCompressor{

    public async compressImage(orignalUnit8Array: Uint8Array,fileExtention: string):Promise<string> {
        try {
            const compressedUint8Array = await this.compressUint8Array(orignalUnit8Array,fileExtention);
            return btoa(String.fromCharCode(...compressedUint8Array));
          } catch (error) {
            throw new Error("Failed to compress image");
          }
    }

    public openImage(file: string): Uint8Array{
        const binaryString = atob(file);
        const len = binaryString.length;
        const uint8Array = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          uint8Array[i] = binaryString.charCodeAt(i);
        }
        return uint8Array;
    }

    private compressUint8Array(uint8Array: Uint8Array, fileExtention:string = "jpeg", maxWidth = 500, maxHeight = 500, quality = 0.7): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
        const blob = new Blob([uint8Array], { type: fileExtention }); // Assume input is PNG
        const img = new Image();
        img.src = URL.createObjectURL(blob);
    
        img.onload = () => {
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;
    
            // Resize if needed
            if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
            }
            if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
            }
    
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
    
            if (!ctx) {
            reject(new Error("Canvas context is null"));
            return;
            }
    
            ctx.drawImage(img, 0, 0, width, height);
    
            // Convert to a compressed Uint8Array (JPEG/WebP)
            canvas.toBlob(
            async (blob) => {
                if (!blob) {
                reject(new Error("Blob is null"));
                return;
                }
    
                const arrayBuffer = await blob.arrayBuffer();
                resolve(new Uint8Array(arrayBuffer)); // Return Uint8Array
            },
            "image/jpeg", // Change to "image/webp" for better compression!
            quality
            );
        };
    
        img.onerror = (error) => reject(error);
        });
    }
}