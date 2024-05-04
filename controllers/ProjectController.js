const Project = require('../models/Project');const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { findUserByAccessToken } = require('./findUser');
const AddProject = async (req, res) => {
    const {projectName} =req.body;
     
    try {
        const newProject = await Project.create({projectName,userId:req.userId});
        console.log(newProject)
        res.json(newProject);
    } catch (error) {
        res.status(400).json({message:error.message});
    }

};

// module.exports = { addProject };
 
const GetAllProject = async(req,res)=>{
    try {
        const foundedUser = await findUserByAccessToken(req);

        const projects = await Project.findAll({where:{userId:req.userId}});
        res.json(projects);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const DeleteProject =async(req,res)=>{
    const {id} =req.params;
     
    const foundedProject= await Project.findByPk(id)
    if(!foundedProject){
        return res.json({message:"همچین پروژه ای وجود ندارد"})
    }
    try {
        if(foundedProject.userId==req.userId){

             await Project.destroy({where:{projectId:id}});
            res.status(204).json({message:"رکورد با موفقیت حذف شد"});
        }
        else{
            return res.status(403).json({message:"عدم دسترسی"})
        }

    } catch (error) {
        res.status(400).json({message:error.message});
    }
}
module.exports = {AddProject,GetAllProject,DeleteProject}