import { usersService, getUserService, createUserService, updateUserService, deleteUserService } from "./user.service";
import bycrpt from 'bcrypt';
export const listUsers = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await usersService(limit);
        if (data == null || data.length == 0) {
            return c.text("User not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
export const getUser = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await getUserService(id);
    if (user == undefined) {
        return c.text("User not found", 404);
    }
    return c.json(user, 200);
};
export const createUser = async (c) => {
    try {
        const user = await c.req.json();
        // Convert date strings to Date objects
        if (user.createdAt) {
            user.createdAt = new Date(user.createdAt);
        }
        if (user.updatedAt) {
            user.updatedAt = new Date(user.updatedAt);
        }
        const pass = user.password;
        const hashedPassword = await bycrpt.hash(pass, 10);
        user.password = hashedPassword;
        const createdUser = await createUserService(user);
        if (!createdUser)
            return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
export const updateUser = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    // Convert date strings to Date objects
    if (user.createdAt) {
        user.createdAt = new Date(user.createdAt);
    }
    if (user.updatedAt) {
        user.updatedAt = new Date(user.updatedAt);
    }
    try {
        // search for the user
        const searchedUser = await getUserService(id);
        if (searchedUser == undefined)
            return c.text("User not found", 404);
        // get the data and update it
        const res = await updateUserService(id, user);
        // return a success message
        if (!res)
            return c.text("User not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
export const deleteUser = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const user = await getUserService(id);
        if (user == undefined)
            return c.text("User not found", 404);
        //deleting the user
        const res = await deleteUserService(id);
        if (!res)
            return c.text("User not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
