import { resultModel } from "../model/resultModel.js"

export const getResultControler = async (req, res) => {
    try {
        let result = await resultModel.find();
        if (result) {
            return res.status(200)
                .json({ success: true, data: result });
        }
    }
    catch (error) {
        return res.status(401)
            .json({ success: false, message: error });
    }
}