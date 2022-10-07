import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AuthLogo from "../../../component/AuthLogo/AuthLogo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveIdBackImage } from "../../../store/actions/auth";
import "./style.css"

const UploadIdBack = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState(null);
    const [disable, setDisable] = useState(true);
    const [sendImageData, setSendImageData] = useState();

    const sendUploadImage = () => {
        dispatch(saveIdBackImage(sendImageData));
        navigate("/UploadRealPhoto");
    }

    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const hiddenFileInput = React.useRef(null);

    useEffect(() => {
        console.log(selectedImage, "selectedImage");
        if(!!selectedImage)
            setDisable(false);
        else setDisable(true);
    },[selectedImage])

    return(
        <div className="upload_id">
            <AuthLogo />
            <div className="upload_id-inner">
                <h1>Upload the back of your ID</h1>
                <div className="image_wrap">
                    <img className="avatar" onClick={handleClick} alt="not found" src={selectedImage ? URL.createObjectURL(selectedImage) : "/image/idcard/back.jpg"} />
                    <h4>Drag a file onto the image</h4>
                </div>
                <div className="description_wrap">
                    <h5>when uploading your ID, make sure:</h5>
                    <ul>
                        <li>ID is on a flat surface, all 4 corners visible</li>
                        <li>Then text is clrearly readable, with no glare</li>
                        <li>The image is in color and unaltered</li>
                        <li>File size must be between 30KB and 3MB</li>
                        <li>File format must be PDF, PNG or JPEG only</li>
                    </ul>
                </div>
                <div className="button_wrap">
                    <button disabled={disable} className="btn next_button" onClick={sendUploadImage}>Next</button>
                </div>
                <input type="file"
                    style={{ display: "none" }}
                    ref={hiddenFileInput}
                    name="myImage" onChange={(event) => {
                        setSendImageData(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                    }} />
            </div>
        </div>
    )
}

export default UploadIdBack;