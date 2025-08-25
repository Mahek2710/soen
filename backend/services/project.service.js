import projectModel from '../models/project.model.js';



export const createProject = async (name,user) => {
    
    if(!name){
        throw new Error('Name is required');
    }
    if(!userId){
        throw new Error('User is required');
    }

    try {
         project = await projectModel.create({
            name,
            users: [userId]
        });
        
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
            throw new Error('Project name already exists');
        }
        throw error;
    }

    return project;

}