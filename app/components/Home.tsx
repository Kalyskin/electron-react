import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import { kppList, rankList } from '../constants';
import routes from '../constants/routes.json';
import { useRouter } from '../hooks/router';
import { ipcRequest } from '../utils/ipcRenderer';
import { UserDto } from '../electron/quiz/quiz.entity';

const useStyles = makeStyles((theme) => {
  return {
    form: {
      marginTop: 20,
      display: 'flex',
      flexDirection: 'column',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      alignItems: 'center',
    },
    photo: {
      width: 300,
      height: 300,
    },
  };
});

const scale = (width, height, maxWidth, maxHeight) => {
  let ratio = 0; // Used for aspect ratio

  // Check if the current width is larger than the max
  if (width > maxWidth) {
    ratio = maxWidth / width; // get ratio for scaling image
  }

  // Check if current height is larger than max
  if (height > maxHeight) {
    ratio = maxHeight / height; // get ratio for scaling image
  }
  return {
    width: width * ratio,
    height: height * ratio,
  };
};

const Home = () => {
  const { navigate } = useRouter();
  const classes = useStyles();
  const [rank, setRank] = useState('');
  const [kpp, setKpp] = useState('');
  const [fullName, setFullName] = useState('');
  const [{ width, height }, setSizeCanvas] = useState({
    width: 0,
    height: 0,
  });
  const videoRef = useRef<HTMLVideoElement>();
  const canvasRef = useRef<HTMLCanvasElement>();
  const handleChangeRank = (event: any) => {
    setRank(event.target.value);
  };
  const handleChangeKpp = (event: any) => {
    setKpp(event.target.value);
  };
  const handleSettingsClick = () => {
    navigate(routes.ADMIN);
  };
  const handleInputFullName = (e: any) => {
    setFullName(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (canvasRef.current) {
      const userDto: UserDto = {
        full_name: fullName,
        kpp,
        rank,
      };
      const imageData = canvasRef.current.toDataURL('image/png');
      const userId = await ipcRequest<number>('quiz/create-user', {
        imageData,
        userDto,
      });
      navigate(routes.CATEGORY.replace(':userId', String(userId)));
    }
  };

  const errorCallback = (error: any) => {
    // eslint-disable-next-line no-console
    console.log('There was an error connecting to the video stream:', error);
  };

  useEffect(() => {
    window.navigator.getUserMedia(
      { video: true, audio: false },
      (localMediaStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = localMediaStream;
          videoRef.current.autoplay = true;
          videoRef.current.onloadedmetadata = () => {
            setSizeCanvas(
              scale(
                videoRef.current?.videoWidth || 0,
                videoRef.current?.videoHeight || 0,
                200,
                200
              )
            );
          };
        }
      },
      errorCallback
    );
  }, [videoRef]);

  const takePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      canvasRef.current
        .getContext('2d')
        .drawImage(videoRef.current, 0, 0, width, height);
    }
  };

  return (
    <Container maxWidth="sm">
      <IconButton
        onClick={handleSettingsClick}
        color="primary"
        aria-label="admin"
        component="span"
      >
        <SettingsIcon />
      </IconButton>
      <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
        <FormControl className={classes.formControl}>
          <Paper className={classes.photo}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video ref={videoRef} autoPlay className={classes.photo} />
          </Paper>
          <br />
          <Button
            variant="contained"
            color="primary"
            size="medium"
            startIcon={<PhotoCameraIcon />}
            onClick={takePhoto}
          >
            Сфотографировать
          </Button>
          <canvas ref={canvasRef} width={width} height={height} />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            value={fullName}
            onInput={handleInputFullName}
            required
            fullWidth
            id="fio"
            label="Ф.И.О"
            variant="outlined"
          />
        </FormControl>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="rank-label">Звания</InputLabel>
          <Select
            required
            fullWidth
            labelId="rank-label"
            id="rank-select"
            value={rank}
            name="rank"
            onChange={handleChangeRank}
          >
            {rankList.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="kpp-label">КПП</InputLabel>
          <Select
            required
            fullWidth
            labelId="kpp-label"
            id="kpp-select"
            value={kpp}
            name="kpp"
            onChange={handleChangeKpp}
          >
            {kppList.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="filled" className={classes.formControl}>
          <Button type="submit" variant="contained" color="primary">
            Начать
          </Button>
        </FormControl>
      </form>
    </Container>
  );
};

export default Home;
