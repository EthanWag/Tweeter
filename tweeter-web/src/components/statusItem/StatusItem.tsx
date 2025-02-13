import {Status,FakeData} from "tweeter-shared";
import {Link} from "react-router-dom";
import Post from "./Post";


interface Props {
  index: number,
  item: Status,
  navigateToUser: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const StatusItem: React.FC<Props> = ({index,item,navigateToUser}) => {
  return (
    <>
      <div
            key={index}
            className="row mb-3 mx-0 px-0 border rounded bg-white"
          >
            <div className="col bg-light mx-0 px-0">
              <div className="container px-0">
                <div className="row mx-0 px-0">
                  <div className="col-auto p-3">
                    <img
                      src={item.user.imageUrl}
                      className="img-fluid"
                      width="80"
                      alt="Posting user"
                    />
                  </div>
                  <div className="col">
                    <h2>
                      <b>
                        {item.user.firstName} {item.user.lastName}
                      </b>{" "}
                      -{" "}
                      <Link
                        to={item.user.alias}
                        onClick={(event) => navigateToUser(event)}
                      >
                        {item.user.alias}
                      </Link>
                    </h2>
                    {item.formattedDate}
                    <br /> 
                    <Post status={item}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  );
}

export default StatusItem;