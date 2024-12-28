import axios from "axios"

// user email,id in user object, task Title body in task object
export async function addTask(user, task) {
    const payload = {
        email: user.email,
        title: task.title,
        body: task.body,
        priority: task.priority,
        color: task.color
    }
    try {
        return await axios.post(`http://localhost:1000/api/v2/getTasks/${user.id}`, payload)
            .then((response) => {
                const result = response.data;
                return result
            }).catch((error) => {
                return error;
            })
    }
    catch (error) {
        return error;
    }
}
//requires old task id, email id of user, new task title and body
export async function updateTask(user, task) {
    const payload = {
        email: user.email,
        title: task.title,
        body: task.body
    }
    try {
        return await axios.put(`http://localhost:1000/api/v2/getTasks/${task.id}`, payload)
            .then((response) => {
                const result = response.data;
                return result
            })
            .catch((error) => {
                return error;
            })
    }
    catch (error) {
        return error;
    }
}

//requires task id and user email
export async function completeTask(user, task) {
    const payload = {
        email: user.email,
    }
    try {
        return await axios.put(`http://localhost:1000/api/v2/completeTask/${task.id}`, payload)
            .then((response) => {
                const result = response.data;
                return result
            })
            .catch((error) => {
                return error;
            })
    }
    catch (error) {
        return error;
    }
}

//requires user email and task id

export async function deleteTask(user, task) {
    const payload = {
        email: user.email,
    }
    try {
        return await axios.delete(`http://localhost:1000/api/v2/deleteTask/${task.id}`, payload)
            .then((response) => {
                const result = response.data;
                return result
            })
            .catch((error) => {
                return error;
            })
    }
    catch (error) {
        return error;
    }
}

//requires user id
export async function getDoneTasks(user, task) {

    try {
        return await axios.get(`http://localhost:1000/api/v2/getTasks/${user.id}`)
            .then((response) => {
                const result = response.data;
                return result
            })
            .catch((error) => {
                return error;
            })
    }
    catch (error) {
        return error;
    }
}

export async function getTasks(user, task) {

    try {
        return await axios.get(`http://localhost:1000/api/v2/getTasks/${user.id}`)
            .then((response) => {
                let result = response.data;
                // console.log(result)
                return result;
            })
            .catch((error) => {
                return j;
            })

    }
    catch (error) {
        return j;
    }
}
// console.log("here")
// const hello = await getTasks({ id: "676ba43b33d90cdb2e0b78c8" }, null)

// console.log(hello);
