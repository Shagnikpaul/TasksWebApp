// All CRUD ops routes
const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");
const Category = require("../models/category");

//CREATE Category using id of user and rest of data of a category

router.post("/addCategory/:id", async (req, res) => {
    try {
        const { category_name, category_emoji, category_color, priority } = req.body;
        const existingUser = await User.findOne({ _id: req.params.id });
        if (existingUser) {
            // if (!priority) priority = 0;

            const category = new Category({ category_name, category_emoji, category_color, priority: priority, user: req.params.id });
            await category.save().then(() => {
                res.status(200).json({ category });

                existingUser.Category.push(category);
                existingUser.save();
            })
        }
    } catch (error) {
        console.log(error);
    }
});

//send user id in parameters of req and email in req body, add title,body, category_id of new task
router.post("/addTask/:id", async (req, res) => {
    try {
        const { title, body, category_id, email } = req.body;

        const existingUser = await User.findOne({ _id: req.params.id, email: email });

        const existingCategory = await Category.findById({ _id: category_id });

        if (existingUser && existingCategory) {

            const list = new List({ title, body, user: existingUser, Category: existingCategory });
            await list.save().then(() => {
                res.status(200).json({ list });

                existingUser.List.push(list);
                existingUser.save();

                existingCategory.tasks.push(list);
                existingCategory.save();
            })
        }
    } catch (error) {
        console.log(error);
    }
});

//Update Task id of task required

router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body, email, category_id } = req.body;
        
        //delete the prev list for old category
        const prevList = await List.findById(req.params.id).select('Category');
                 
        var prevCategoryId  =  prevList.Category[0].toJSON();
        
        // console.log('prevCategoryId',prevCategoryId);
        
        if(prevCategoryId)
        await Category.findByIdAndUpdate(prevCategoryId, { $pull: { tasks: req.params.id } })

        const existingUser = await User.findOne({ email });
        //check new category exists or not
        const existingCategory = await Category.findById(category_id);

        if (existingUser && existingCategory) {
            const list = await List.findByIdAndUpdate(req.params.id, {
                title: title,
                body: body,
                Category: category_id,
            });

            existingCategory.tasks.push(list);
            existingCategory.save();

            list.save().then(() => res.status(200).json({ message: "Task updated" }));
        }
    } catch (error) {
        console.log(error);
    }
});

//Complete Task, id of task required, email of user requred in req body

router.put("/completeTask/:id", async (req, res) => {
    try {
        const { title, email } = req.body;
        const existingUser = await User.findOne(
            { email }
        );
        if (existingUser) {
            await List.findByIdAndUpdate(req.params.id, { isCompleted: true })
                .then(() => res.status(200).json({ message: "Task Completed" }));
        }
    } catch (error) {
        console.log(error);
    }
});

//Delete Task id of task required

router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { title, email } = req.body;
        const existingUser = await User.findOneAndUpdate(
            { email },
            { $pull: { List: req.params.id } }
        );
        if (existingUser) {
            await List.findByIdAndDelete(req.params.id)
                .then(() => res.status(200).json({ message: "Task Deleted" }));
        }
    } catch (error) {
        console.log(error);
    }
});

//GET Tasks, id of user required

router.get("/getTasks/:id", async (req, res) => {
    try {
        const list = await (List.find({ user: req.params.id }));
        if (list.length != 0)
            res.status(200).json({ list, "message": "tasks" });
        else
            res.status(200).json({ "message": "no tasks" });
        //use .sort({createdAt: -1}) opposite to created At id use priority number
    } catch (error) {
        console.log(error);
    }
});

// GET the task done => iscompleted is set to true send user id in params  
router.get("/getDoneTasks/:id", async (req, res) => {
    try {
        const list = await (List.find({ user: req.params.id }).find({ isCompleted: true }));
        if (list.length != 0)
            res.status(200).json({ list });
        else
            res.status(200).json({ "message": "no tasks" });
        //use .sort({createdAt: -1}) opposite to created At id use priority number
    } catch (error) {
        console.log(error);
    }
});

//UNDO task same as completeTask, give id of task
router.put("/undoTask/:id", async (req, res) => {
    try {
        const { title, email } = req.body;
        const existingUser = await User.findOne(
            { email }
        );
        if (existingUser) {
            await List.findByIdAndUpdate(req.params.id, { isCompleted: false })
                .then(() => res.status(200).json({ message: "Task Undone" }));
        }
    } catch (error) {
        console.log(error);
    }
});



//Update Category category id required in req params, rest of the stuff in req body

router.put("/updateCategory/:id", async (req, res) => {
    try {
        // const { title, body, email, category_id } = req.body;
        const { category_name, category_emoji, category_color, priority , email} = req.body;

        const existingCategory = await Category.findById(req.params.id);

        const existingUser = await List.find({email: email});

        if (!existingCategory) {
            res.status(200).json({ message: "Category Not found" });
            return;
        }

        if (!existingUser) {
            res.status(200).json({ message: "User Not found" });
            return;
        }

        const category = await Category.findByIdAndUpdate(req.params.id, {
            category_name: category_name,
            category_emoji: category_emoji,
            category_color: category_color,
            priority: priority
        });
        category.save().then(() => res.status(200).json({ message: "Category updated" }));

    } catch (error) {
        console.log(error);
    }
});

// pass user id in req.params.id
router.get("/getCategories/:id", async (req, res) => {
    try {
        const categories = await (Category.find({ user: req.params.id }));
        if (categories.length != 0)
            res.status(200).json({ categories, "message": "categories" });
        else
            res.status(200).json({ "message": "no categories found" });
        //use .sort({createdAt: -1}) opposite to created At id use priority number
    } catch (error) {
        console.log(error);
    }
});

//Delete Category, id of Category required, email of user required in req body
router.delete("/deleteCategory/:id", async (req, res) => {
    try {
        const { title, email } = req.body;
        const existingUser = await User.findOneAndUpdate(
            { email },
            { $pull: { Category: req.params.id } }
        );
        const existingTasks = await List.deleteMany(
            { Category: req.params.id }
        );
        if (existingUser) {
            await Category.findByIdAndDelete(req.params.id)
                .then(() => res.status(200).json({ message: "Category Deleted" }));
        }
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;