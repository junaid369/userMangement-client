import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import "react-image-crop/dist/ReactCrop.css";
import Fade from "@mui/material/Fade";
import ReactCrop from "react-image-crop";
import { getUser, doUpdate } from "../../Axios";
import "./EditPage.css";

export default function EditPage() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ error: true });
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [blob, setBlob] = useState(null);
  const [file, setFile] = useState();
  const [open, setOpen] = useState(false);
  const [list, setList] = useState();
  const [check, setCheck] = useState(true);
  const [result, setResult] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState({
    fullname: "",
    email: "",
    mobile: "",
    date: "",
    radio: "",
  });

  const handleChange = (event) => {
    console.log(event.target.value);
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    getUser(id).then((data) => {
      setValue(data);
    });
  }, []);

  function handleClick(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    console.log(URL.createObjectURL(e.target.files[0]));
    setOpen(true);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let formdata = new FormData();
    formdata.append("image", blob);
    formdata.append("fullname", value.Fullname);
    formdata.append("email", value.Email);
    formdata.append("mobile", value.Mobile);
    formdata.append("date", value.Date);
    formdata.append("radio", value.Radio);
    formdata.append("id", id);

    doUpdate(formdata, id)
      .then((data) => {
        navigate("/");
      })
      .catch((error) => {});
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 124,
  };

  function getCroppedImg() {
    setOpen(false);
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          blob.name = "image";

          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            var base64data = reader.result;
            setResult(base64data);
          };
          setBlob(blob);
          console.log(blob);
          setFile(null);
        },
        "image/jpeg",
        1
      );
    });
  }

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-center">
          <b>Registration</b>
        </h2>

        <div className="fileds">
          <div className="row ">
            <div className="abc">
              fullname
              <input
                type="text"
                name="Fullname"
                className="form-control"
                placeholder=""
                onChange={handleChange}
                value={value.Fullname}
              />
              {errors.fullname && <p className="error">{errors.fullname}</p>}
            </div>
            <div className="abc">
              Email
              <input
                type="email"
                name="Email"
                className="form-control"
                placeholder=""
                onChange={handleChange}
                value={value.Email}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
          </div>
          <div className="row ">
            <div className="abc">
              mobile
              <input
                type="number"
                name="Mobile"
                className="form-control"
                placeholder=""
                onChange={handleChange}
                value={value.Mobile}
              />
              {errors.mobile && <p className="error">{errors.mobile}</p>}
            </div>
            <div className="abc">
              Date
              <input
                type="date"
                name="Date"
                className="form-control"
                placeholder=""
                onChange={handleChange}
                value={value.Date}
              />
              {errors.date && <p className="error">{errors.date}</p>}
            </div>
          </div>

          <div className="row radio">
            <FormLabel id="demo-row-radio-buttons-group-label">
              Job Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleChange}
            >
              <FormControlLabel
                name="Radio"
                value="partTime"
                control={<Radio />}
                label="PT"
              />
              <FormControlLabel
                name="Radio"
                value="fullTime"
                control={<Radio />}
                label="FT"
              />
              <FormControlLabel
                value="consultant"
                control={<Radio />}
                label="consultant"
                name="Radio"
              />
              {errors.radio && <p className="error">{errors.radio}</p>}

              {result ? (
                <div className="positon">
                  <img className="imgo" src={result}></img>
                </div>
              ) : (
                <input
                  className="img"
                  type="file"
                  name="img"
                  onChange={(e) => {
                    handleClick(e);
                    setCheck(false);
                  }}
                />
              )}
              {check ? <img className="Eimage" src={value.Path}></img> : null}
            </RadioGroup>
          </div>

          <div className="add">
            <button
              type="button"
              onClick={handleFormSubmit}
              className="btn btn-light add"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {file && (
              <div>
                <ReactCrop
                  style={{ height: "100%", width: "100%" }}
                  src={file}
                  className="src"
                  onImageLoaded={setImage}
                  crop={crop}
                  onChange={setCrop}
                />
                <Button
                  variant="contained"
                  className="cropimg"
                  onClick={getCroppedImg}
                >
                  cropimage
                </Button>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
