import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomeView.css";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import validation from "./Validation";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import "react-image-crop/dist/ReactCrop.css";
import Fade from "@mui/material/Fade";
import ReactCrop from "react-image-crop";
import { doSubmit, getUserDetails, deleteUser } from "../../Axios";

const Input = styled("input")({
  display: "none",
});

export default function HomeView() {
  const [errors, setErrors] = useState({ error: true });
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [blob, setBlob] = useState(null);
  const [file, setFile] = useState();
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const navigate = useNavigate();
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

  let deletes = (id) => {
    deleteUser(id).then((data) => {});
  };

  const handleChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    getUserDetails().then((value) => {
      setList(value);
    });
  }, [list]);

  function handleClick(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    console.log(URL.createObjectURL(e.target.files[0]));
    setOpen(true);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(value));
    if (!errors.error) {
      let formdata = new FormData();
      formdata.append("image", blob);
      formdata.append("fullname", value.fullname);
      formdata.append("email", value.email);
      formdata.append("mobile", value.mobile);
      formdata.append("date", value.date);
      formdata.append("radio", value.radio);

      doSubmit(formdata)
        .then((data) => {})
        .catch((error) => {});
    }
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
                name="fullname"
                className="form-control"
                placeholder=""
                onChange={handleChange}
                n
              />
              {errors.fullname && <p className="error">{errors.fullname}</p>}
            </div>
            <div className="abc">
              Email
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder=" "
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
          </div>
          <div className="row ">
            <div className="abc">
              mobile
              <input
                type="number"
                name="mobile"
                className="form-control"
                placeholder=""
                onChange={handleChange}
              />
              {errors.mobile && <p className="error">{errors.mobile}</p>}
            </div>
            <div className="abc">
              Date
              <input
                type="date"
                name="date"
                className="form-control"
                placeholder=" "
                onChange={handleChange}
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
                name="radio"
                value="partTime"
                control={<Radio />}
                label="PT"
              />
              <FormControlLabel
                name="radio"
                value="fullTime"
                control={<Radio />}
                label="FT"
              />
              <FormControlLabel
                value="consultant"
                control={<Radio />}
                label="consultant"
                name="radio"
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
                  }}
                />
              )}
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
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">image</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">DoB</th>
            <th scope="col">Job Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((val) => {
            return (
              <tr>
                <th scope="row">{val.Fullname}</th>
                <td>
                  <img className="imagerow" src={val.Path}></img>
                </td>
                <td>{val.Email}</td>
                <td>{val.Mobile}</td>
                <td>{val.Date}</td>
                <td>{val.Radio}</td>
                <td>
                  <DeleteIcon
                    className="delete"
                    onClick={() => {
                      deletes({ id: val._id });
                    }}
                  />
                  <EditIcon
                    className="edit"
                    onClick={() => {
                      navigate(`/edit/${val._id}`);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

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
