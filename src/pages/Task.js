import { convertFromRaw, convertToRaw } from "draft-js";
import { Button, Container, MenuItem, Select, TextField } from "@mui/material";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { v4 as uuid } from "uuid"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";

export default function Task() {
    const defaultValues = {
        form_id: uuid(),
        form_title: "Sample Template Title",
        formNodes: [
            {
                form_node_id: uuid(),
                title: "Warning Title",
                type: "Warning",
                description: "Enter description for this warning.",
            },
            {
                form_node_id: uuid(),
                title: "Caution Title",
                type: "Caution",
                description: "Enter description for this caution.",
            },
            {
                form_node_id: uuid(),
                title: "Task Title",
                type: "Task",
                description: "Enter description for this task.",
            },
        ]
    };

    const { setValue, getValues, reset, watch, register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues });


    const { fields, append, remove } = useFieldArray({
        name: "formNodes",
        control
    });

    const [title, setTitle] = useState(defaultValues.form_title)


    useEffect(() => {
        register("formNodes", { required: true });
    }, [register]);


    const onEditorStateChange = (index) => (editorState) => {
        setValue(`formNodes.${index}.description`, editorState);
    };


    const onSubmit = async (data) => {
        //make a copy of te ucrrent activity
        //Append that to the list
        //increment the id counter
        
        console.log(data)
        await fetch('http://localhost:5000/',
                {
                    method:'POST',
                    body: JSON.stringify( { 
                        template_id: data.form_id,
                        template_title: data.form_title,
                        template_owner_id: uuid(),
                        template_nodes: data.formNodes.map((formNode, i) => {
                            return {
                                node_id: formNode.form_node_id,
                                node_title: formNode.title,
                                node_description: formNode.description,
                                node_type: formNode.type,
                                template_id: data.form_id,
                            }
                            
                        }),
                        template_created_at: new Date(),
                     }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
               
                );
    }

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }


    return (
        <Container maxWidth={'lg'} className="p-5">
            <form onSubmit={handleSubmit(onSubmit)} className="relative w-full overflow-visible space-y-8">
                <TextField placeholder="Enter Form Title" {...register(`form_title`, { required: true })} defaultValue={title} className="" />
                <div className="flex flex-col space-y-4">
                    {
                        fields.map((field, index) => <div key={field.id} className="relative w-full h-full">
                            <TextField
                                placeholder="Enter Task Title"
                                {...register(`formNodes.${index}.title`, {
                                    required: true
                                })}
                                defaultValue={field.title}
                            />

                            <Controller
                                name={`formNodes.${index}.type`}
                                control={control}
                                defaultValue={field.type}
                                render={({ field }) => (
                                    <Select {...field}>
                                        <MenuItem value={"Warning"}>Warning</MenuItem>
                                        <MenuItem value={"Caution"}>Caution</MenuItem>
                                        <MenuItem value={"Note"}>Note</MenuItem>
                                        <MenuItem value={"Task"}>Task</MenuItem>
                                    </Select>
                                )}
                            />


                            <ReactQuill
                                theme="snow"
                                value={field.description}
                                onChange={onEditorStateChange(index)}
                                modules={modules}
                            />
                            <div className="absolute top-3 right-3">
                            <Button type="button" className="" variant="outlined" onClick={() => remove(index)}>
                                <div className="flex flex-row items-center space-x-4">
                                    Delete Form Node
                                    <HighlightOffIcon className="h-5 w-5" />
                                </div>

                            </Button>
                            </div>
                            
                        </div>)
                    }
                    <div className="flex flex-row items-center justify-start space-x-2">
                        <Button variant="outlined" onClick={() => append({
                            form_node_id: uuid(),
                            title: "Sample Title",
                            type: "Task",
                            description: "",
                        })}>
                            Add Form Node
                        </Button>
                        <Button type="submit" variant="outlined">
                            Save Form Template
                        </Button>
                    </div>

                </div>
            </form>

        </Container>

    )
}