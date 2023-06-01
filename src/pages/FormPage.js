import { Container } from "@mui/material"
import Button from "@mui/material/Button"
import { useState } from "react"
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function FormPage() {
    const [formNodes, setFormNodes] = useState(
        [
            {
                title: "Form A NODE",
                description: "The description of this node and what it means",
                type: "Warning"
            },
            {
                title: "Form B NODE",
                description: "The description of this node means we are working",
                type: "Warning"
            },
            {
                title: "Form C NODE",
                description: "The description of C node is what the fpseed of like",
                type: "Warning"
            },
        ]
    )
    
    const [value, setValue] = useState()

    function handleAdd() {
        const nextFormNode = {
            title: "sample node",
            description: "Some sample description that is fitting of a form descriptoi and tests your ability to staty sane.",
            type: "Task"
        }
        setFormNodes([...formNodes, nextFormNode])
    }



    return (
        <Container>
            <div className="space-y-3">
            {
                formNodes.map((formNode, i) =>
                    <div key={i} className="flex flex-col items-start justify-center w-full p-4 h-[100px] rounded-md bg-[red] text-white">
                        <div className="flex flex-row space-x-1 items-center">
                            {formNode.type == "Warning" ? <WarningAmberIcon/> : <></>}
                            <p className="text-xl">{formNode.title}</p>
                        </div>
                        {formNode.description}
                    </div>
                )
            }
            </div>
           
            <Button onClick={handleAdd}>
                Add Element
            </Button>
            <div className="h-[100px] border">
            <Editor />

            </div>
        </Container>
    )
}
