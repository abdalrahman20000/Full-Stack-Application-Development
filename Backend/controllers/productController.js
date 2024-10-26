const pool = require("./../config/db");

exports.getProducts = async (req, res) => {
    // console.log("inside getProducts controller");
    try {

        // console.log("----");

        const products = await pool.query("SELECT id, name, price, category, description, availability_status, created_at, updated_at FROM public.products;");

        const productsData = products.rows;

        // console.log("Products:", productsData);

        res.status(200).json(productsData);
    } catch (err) {
        console.log("Server Error (getProducts):", err);
        res.status(500).json({ error: "Server Error (getProducts)" });
    }
};

exports.addProducts = async (req, res) => {
    console.log("inside addProducts controller");
    try {
        const { formData } = req.body;
        console.log(formData);

        const addProducts = await pool.query(
            "INSERT INTO public.products(name, price, category, description) VALUES($1, $2, $3, $4) RETURNING *",
            [formData.name, formData.price, formData.category, formData.description]
        )
            .catch(err => { console.log(err) })

        res.status(200).json("Product added successfully");
    } catch (err) {
        console.log("Server Error (addProducts):", err);
        res.status(500).json({ error: "Server Error (addProducts)" });
    }
};

exports.updateProducts = async (req, res) => {
    // console.log("inside updateProducts controller");
    try {
        const { formData } = req.body;
        // console.log(formData);

        const addProducts = await pool.query(
            `UPDATE public.products SET name=$1, price=$2, category=$3, description=$4, availability_status=$5, updated_at=$6 WHERE id='${formData.id}' RETURNING *`,
            [formData.name, formData.price, formData.category, formData.description, formData.availability_status, formData.updated_at]
        )
            .catch(err => { console.log(err) })

        res.status(200).json("Product updated successfully");
    } catch (err) {
        console.log("Server Error (updateProducts):", err);
        res.status(500).json({ error: "Server Error (updateProducts)" });
    }
};

exports.deleteProduct = async (req, res) => {
    // console.log("inside deleteProduct controller");
    try {
        const { id } = req.params;

        // console.log(id);

        const deleteProducts = await pool.query(`DELETE FROM public.products WHERE id='${id}';`);

        res.status(200).json("Product deleted successfully");
    } catch (err) {
        console.log("Server Error (deleteProduct):", err);
        res.status(500).json({ error: "Server Error (deleteProduct)" });
    }
};
