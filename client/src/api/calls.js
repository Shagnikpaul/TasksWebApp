import axios from "axios"

// user email,id in user object, task Title body in task object
export async function addTask(user, task) {
    const endpoint = "localhost:1000/api/v2/addTask/".concat(user.id);

    const payload = {
        email: user.email,
        title: task.title,
        body: task.body,
        priority: task.priority,
        color: task.color
    }
    try {
        const response = await axios.post(endpoint, payload)
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
    const endpoint = "localhost:1000/api/v2/updateTask".concat(task.id);

    const payload = {
        email: user.email,
        title: task.title,
        body: task.body
    }
    try {
        const response = await axios.put(endpoint, payload)
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
    const endpoint = "localhost:1000/api/v2/completeTask".concat(task.id);

    const payload = {
        email: user.email,
    }
    try {
        const response = await axios.put(endpoint, payload)
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
    const endpoint = "localhost:1000/api/v2/deleteTask".concat(task.id);

    const payload = {
        email: user.email,
    }
    try {
        const response = await axios.delete(endpoint, payload)
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

//requires user id id
export async function getDoneTasks(user, task) {
    const endpoint = "localhost:1000/api/v2/getDoneTasks".concat(user.id);

    try {
        const response = await axios.get(endpoint)
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

const j = {
    list: [
        {
            _id: '676f944896993451fab29e20',
            title: 'throw in valo',
            body: 'do it by 12pm',
            priotity: 0,
            color: 'gray',
            isCompleted: false,
            user: [Array],
            __v: 0
        },
        {
            _id: '676f99694f04c91c377af5b1',
            title: 'throw in valo part 2',
            body: 'do it by 12pm epic fail',
            priotity: 0,
            color: 'gray',
            isCompleted: false,
            user: [Array],
            __v: 0
        }
    ]
}


export async function getTasks(user, task) {

    try {
        return await axios.get(`http://localhost:1000/api/v2/getTasks/${user.id}`)
            .then((response) => {
                let result = response.data;
                // console.log(response)
                // console.log("here2")
                console.log(result)
                return j;
            })
            .catch((error) => {
                return j;
            })

    }
    catch (error) {
        return j;
    }
}
console.log("here")
const hello = await getTasks({ id: "676ba43b33d90cdb2e0b78c8" }, null)

console.log(hello);
