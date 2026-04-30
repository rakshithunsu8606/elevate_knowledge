import { useField } from 'formik';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import File from '../../Component/FileUpload/File';
import React from 'react';
import { IMAGE_URL } from '../../../../utility/url';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});



function File({ type, ...props }) {
    const [field, meta, helpers] = useField(props);
    const { setValue } = helpers;

    let file = ''

    let files;

    if (field?.value) {
        files = Array.from(field?.value);
    }


    console.log("files:", files);

    const fileArr = files?.map((v) => {
        console.log(v);

        if (v?.url) {
            return {
                url: v?.url,
                type: v?.type
            };
        } else {
            return {
                url: URL.createObjectURL(v),
                type: v?.type
            }
        }

        // if (typeof v === 'string') {
        //     // console.log("field.value", field.value);
        //     return (file = v.name)
        // } else if (typeof v === 'object' && v !== null) {
        //     return (file = URL.createObjectURL(v))
        // }
    })

    console.log("fileArr:", fileArr);







    console.log("field", field.value);
    console.log("meta", meta);
    console.log("Props", props);

    console.log(files);
    return (
        <>
            <Button
                component="label"
            >
                Upload files
                <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => {
                        const files = Array.from(event.target.files || []);
                        setValue(files);
                        event.target.value = null;

                    }

                    }
                    multiple
                // onBlur={handleBlur}
                />
            </Button>

            {

                fileArr?.map((v) => {
                    if (v.type === 'image' || v.type === "image/jpeg") {
                        return (
                            <img src={v.url} width={'50px'} height={'50px'} />
                        )
                    } else if (v.type === 'video' || v.type === "video/mp4") {
                        return (
                            <video src={v.url} width={'50px'} height={'50px'} />
                        )
                    } else if (v.type === 'application/pdf') {
                        return (
                            <a href={v.url} target='_blank'>
                                View Pdf
                            </a>
                        )
                    }
                })

            }


            {/* <img src={file} width={'50px'} height={'50px'} /> */}
            {
                meta.error && meta.touched ?
                    <p style={{ color: 'red' }}>{meta.error}</p> : ''
            }


        </>
    );
}

export default File;