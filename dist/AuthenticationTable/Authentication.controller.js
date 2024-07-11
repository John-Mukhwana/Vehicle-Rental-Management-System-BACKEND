import { authenticationService, getAuthenticationService, createAuthenticationService, updateAuthenticationService, deleteAuthenticationService, createAuthUserService, userLoginService } from './Authentication.service';
import bycript from 'bcrypt';
import { sign } from 'hono/jwt';
export const listAuthentication = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await authenticationService(limit);
        if (data == null || data.length == 0) {
            return c.text("Authentication not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
export const getAuthentication = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Authentication = await getAuthenticationService(id);
    if (Authentication == undefined) {
        return c.text("Authentication not found", 404);
    }
    return c.json(Authentication, 200);
};
export const createAuthentication = async (c) => {
    try {
        const Authentication = await c.req.json();
        const createdAuthentication = await createAuthenticationService(Authentication);
        if (!createdAuthentication)
            return c.text("Authentication not created", 404);
        return c.json({ msg: createdAuthentication }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
export const updateAuthentication = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Authentication = await c.req.json();
    try {
        // search for the user
        const searchedAuthentication = await getAuthenticationService(id);
        if (searchedAuthentication == undefined)
            return c.text("Authentication not found", 404);
        // get the data and update it
        const res = await updateAuthenticationService(id, Authentication);
        // return a success message
        if (!res)
            return c.text("Authentication not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
export const deleteAuthentication = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const Authentication = await getAuthenticationService(id);
        if (Authentication == undefined)
            return c.text("Authentication not found", 404);
        //deleting the user
        const res = await deleteAuthenticationService(id);
        if (!res)
            return c.text("Authentication not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
//login Aunthentication
export const registerUser = async (c) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bycript.hash(pass, 10);
        user.password = hashedPassword;
        const createdUser = await createAuthUserService(user);
        if (!createdUser)
            return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
export const loginUser = async (c) => {
    try {
        const user = await c.req.json();
        //check user exist
        const userExist = await userLoginService(user);
        if (userExist === null)
            return c.json({ error: "User not found" }, 404); // not found         
        const userMatch = await bycript.compare(user.password, userExist?.password);
        if (!userMatch) {
            return c.json({ error: "Invalid credentials" }, 401); // unauthorized
        }
        else {
            // create a payload
            const payload = {
                sub: userExist?.email,
                role: userExist?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 180) // 3 hour  => SESSION EXPIRATION
            };
            let secret = process.env.JWT_SECRET; // secret key
            const token = await sign(payload, secret); // create a JWT token
            let user = userExist?.users;
            let role = userExist?.role;
            return c.json({ token, user: { role, ...user } }, 200); // return token and user details
        }
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
