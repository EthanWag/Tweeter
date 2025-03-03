import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../../../src/components/authentication/login/Login"


describe("Login Component", () => {

    it("This is a test", () => {


    });
});

const renderComponent = () => {
    return render(

        <MemoryRouter>
            <></>
        </MemoryRouter>

    );
}