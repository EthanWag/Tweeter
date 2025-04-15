/*
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

import React from "react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { mock, instance, verify } from "@typestrong/ts-mockito";
import userEvent from "@testing-library/user-event";

import Login from "../../../src/components/authentication/login/Login"
import { LoginPresenter } from "../../../src/presenter/LoginPresenter";

library.add(fab);

describe("Login Component", () => {
    it("starts with the sign-in button disabled", () => {
        
        const { signInButton } = renderLoginAndGetElement("/");
        expect(signInButton).toBeDisabled();

    });

    it("enables the sign-in button if both alias and password fields have text", async () => {
        const { signInButton, aliasField, passwordField, user } = renderLoginAndGetElement("/");
    
        await user.type(aliasField, "test");
        await user.type(passwordField, "very good password");

        expect(signInButton).toBeEnabled();
    });

    it("disables the sign-in button if either field is cleared", async () => {
        const { signInButton, aliasField, passwordField, user } = renderLoginAndGetElement("/");
    
        await user.type(aliasField, "test");
        await user.type(passwordField, "very good password");
        expect(signInButton).toBeEnabled();

        await user.clear(aliasField);
        expect(signInButton).toBeDisabled();

        await user.type(aliasField, "test");
        expect(signInButton).toBeEnabled();
    });

    it("calls the presenter login method with correct parameters when the sign-in button is pressed", async () => {
    
        const mockPresenter = mock<LoginPresenter>();
        const mockPresenterInstance = instance(mockPresenter);

        const originalUrl = "http://blah.com";
        const alias = "@test";
        const password = "password";

        const { signInButton, aliasField, passwordField, user } = renderLoginAndGetElement(originalUrl, mockPresenterInstance);

        await user.type(aliasField, alias);
        await user.type(passwordField, password);

        await user.click(signInButton);

        verify(mockPresenter.doLogin(alias, password, false, originalUrl)).once();
    });
    
});


const renderLogin = (originalUrl : string, presenter?: LoginPresenter) => {
    // we need a prop here because we also need a generator

    return render(
        <MemoryRouter>
            { !!presenter ? (
                <Login originalUrl={originalUrl} presenter={presenter} />
            ) : (
                <Login originalUrl={originalUrl} />
            )}
        </MemoryRouter>
    );
};

const renderLoginAndGetElement = (orignalUrl : string, presenter?: LoginPresenter) => {
    const user = userEvent.setup();

    renderLogin(orignalUrl, presenter);

    const signInButton = screen.getByRole("button",{ name: /Sign in/i });
    const aliasField = screen.getByLabelText("alias");
    const passwordField = screen.getByLabelText("password");

    return { signInButton, aliasField, passwordField, user };
}
*/