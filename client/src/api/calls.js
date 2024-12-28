import axios from "axios"
import dotenv from "dotenv"

dotenv.config({ path: '.env' })
const d_uri = "http://localhost:8000"


console.log('d_uri', d_uri);






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
        return await axios.post(`${d_uri}/api/v2/addTask/${user.id}`, payload)
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
        return await axios.put(`${d_uri}/api/v2/updateTask/${task.id}`, payload)
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
        return await axios.put(`${d_uri}/api/v2/completeTask/${task.id}`, payload)
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
        return await axios.delete(`${d_uri}/api/v2/deleteTask/${task.id}`, { data: payload })
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

// export async function deleteTask(user, task) {
//     const payload = {
//         email: user.email,
//     }
//     try {
//         console.log('uri delete : ', `${d_uri}/api/v2/deleteTask/${task.id}`);

//         return await axios.delete(`${d_uri}/api/v2/deleteTask/${task.id}`, payload)
//             .then((response) => {

//                 console.log(response);
//                 const result = response.data;
//                 return result
//             })
//             .catch((error) => {
//                 return error;
//             })
//     }
//     catch (error) {
//         return error;
//     }
// }

//requires user id
export async function getDoneTasks(user, task) {

    try {
        return await axios.get(`${d_uri}/api/v2/getDoneTasks/${user.id}`)
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
        return await axios.get(`${d_uri}/api/v2/getTasks/${user.id}`)
            .then((response) => {
                let result = response.data;
                // console.log(result)
                return result;
            })
            .catch((error) => {
                return error;
            })

    }
    catch (error) {
        return error;
    }
}
// console.log("here")
// const hello = await getTasks({ id: "6768497caf18629230d56a10" }, null)
// console.log('trying getTasks : ', hello);



// const hello = await completeTask({ email: "kanch@gmail.com" }, { id: "676f944896993451fab29e20" })
// console.log('trying complete task : ', hello);


// const hello = await getDoneTasks({ id: "676ba43b33d90cdb2e0b78c8" })
// console.log('getting completed tasks', hello)


// const hello = await deleteTask({ email: "kanch@gmail.com" }, { id: "676f944896993451fab29e20" })


// console.log('testing deleteTask', hello);



// const hello = await updateTask({ email: "tycon@gmail.com" }, { id: "676849a1af18629230d56a13", title: "28th december 2024", body: "some task i have to do" })
// console.log('testing updateTask ', hello);
