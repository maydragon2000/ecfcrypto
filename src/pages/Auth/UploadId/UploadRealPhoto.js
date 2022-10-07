import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AuthLogo from "../../../component/AuthLogo/AuthLogo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveRealPhoto } from "../../../store/actions/auth";
import "./style.css"

const UploadRealPhoto = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState(null);
    const [disable, setDisable] = useState(true);
    const [sendImageData, setSendImageData] = useState()

    const sendUploadImage = () => {
        setDisable(true);
        dispatch(saveRealPhoto(sendImageData));
        navigate("/RecoveryPhrase");
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
    },[selectedImage]);

    return(
        <div className="upload_id">
            <AuthLogo />
            <div className="upload_id-inner">
                <h1>Take a selfie with ID</h1>
                <div className="image_wrap">
                    <img className="real_avatar" onClick={handleClick} alt="not found" src={selectedImage ? URL.createObjectURL(selectedImage) : "/image/idcard/front.jpg"} />
                    <h4>Drag a file onto the photo above</h4>

                </div>
                <div className="description_wrap">
                    <h5>Upload a photo of yourself with all the following</h5>
                    <ul>
                        <li>ID:the same one you just uploaded</li>
                        <li>Paper note:write "ECF Crypto" and today's date on it</li>
                        <li>To get verified, both must be in the selfie</li>
                    </ul>
                </div>
                <div className="button_wrap">
                    <button disabled={disable} className="btn next_button" onClick={sendUploadImage}>Next</button>
                </div>
                <input type="file"
                    style={{ display: "none" }}
                    ref={hiddenFileInput}
                    name="myImage" onChange={(event) => {
                        setSendImageData(event.target.files[0])
                        setSelectedImage(event.target.files[0]);
                    }} />
            </div>
        </div>
    )
}

export default UploadRealPhoto;