import React, { useEffect } from 'react';
import { Button, Container } from '@material-ui/core';
import * as docx from 'docx';
import { AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import Paper from '@material-ui/core/Paper';
import { useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import { makeStyles } from '@material-ui/core/styles';
import { ResultDto } from '../electron/quiz/quiz.entity';
import { useRouter } from '../hooks/router';
import { categoryTitle } from '../utils/category';
import PageTemplate from './PageTemplate';
import { resultState } from '../recoil/atoms/resultState';
import { ipcRequest } from '../utils/ipcRenderer';
import routes from '../constants/routes.json';
// import routes from '../constants/routes.json';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  userinfo: {
    margin: theme.spacing(1, 1, 1),
  },
  buttons: {
    width: 400,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'space-around',
    padding: theme.spacing(2),
    justifyContent: 'space-evenly',
  },
}));

export default function ResultPage() {
  const classes = useStyles();
  const { navigate } = useRouter();
  const { userId, categoryId } = useParams<{
    userId: string;
    categoryId: string;
  }>();
  const [resultDto, setResultState] = useRecoilState(resultState);

  useEffect(() => {
    ipcRequest('quiz/result', {
      userId: Number(userId),
      category: categoryId,
    })
      .then((result: ResultDto) => {
        setResultState(result);
        console.log(result);
        return null;
      })
      .catch(console.error);
  }, [userId, categoryId, setResultState]);

  const goToCategories = () => {
    navigate(routes.CATEGORY.replace(':userId', String(userId)));
  };

  const goHome = () => {
    navigate(routes.HOME);
  };
  const handleDownloadDocx = () => {
    const doc = new docx.Document();

    const image1 = docx.Media.addImage(
      doc,
      Buffer.from(resultDto.user.image, 'base64'),
      150,
      150
    );

    doc.addSection({
      properties: {},
      children: [
        new docx.Paragraph({
          alignment: AlignmentType.CENTER,
          text: 'ТЕСТИРОВАНИЕ',
          heading: docx.HeadingLevel.HEADING_1,
        }),
        new docx.Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [image1],
        }),
        new docx.Paragraph({
          alignment: AlignmentType.LEFT,
          text: resultDto.user.rank,
          heading: docx.HeadingLevel.HEADING_3,
        }),
        new docx.Paragraph({
          alignment: AlignmentType.LEFT,
          text: resultDto.user.full_name,
          heading: docx.HeadingLevel.HEADING_3,
        }),
        new docx.Paragraph({
          alignment: AlignmentType.LEFT,
          text: resultDto.user.kpp,
          heading: docx.HeadingLevel.HEADING_3,
        }),
        new docx.Paragraph({
          text: '\n',
        }),
        new docx.Paragraph({
          alignment: AlignmentType.CENTER,
          text: 'РЕЗУЛЬТАТЫ ТЕСТА',
          heading: docx.HeadingLevel.HEADING_1,
        }),
        new docx.Paragraph({
          alignment: AlignmentType.CENTER,
          text: `Вы набрали: ${resultDto.percent} процентов`,
        }).addRunToFront(new docx.Run({}).break()),
        new docx.Paragraph({
          alignment: AlignmentType.RIGHT,
          text: `Дата время секунда`,
        }),
        new docx.Paragraph({}),
        new docx.Paragraph({
          alignment: AlignmentType.CENTER,
          text: `Ознакомлен (-а) с результатами теста                                ____________________`,
        }).addRunToFront(new docx.Run({}).break()),
        new docx.Paragraph({}).addRunToFront(
          new docx.Run({}).break().break().break().break().break().break()
        ),
        new docx.Paragraph({
          alignment: AlignmentType.CENTER,
          text: 'ТЕСТИРОВАНИЕ',
          heading: docx.HeadingLevel.HEADING_1,
        }),
        new docx.Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [image1],
        }),
        new docx.Paragraph({
          alignment: AlignmentType.LEFT,
          text: resultDto.user.rank,
          heading: docx.HeadingLevel.HEADING_3,
        }),
        new docx.Paragraph({
          alignment: AlignmentType.LEFT,
          text: resultDto.user.full_name,
          heading: docx.HeadingLevel.HEADING_3,
        }),
        new docx.Paragraph({
          alignment: AlignmentType.LEFT,
          text: resultDto.user.kpp,
          heading: docx.HeadingLevel.HEADING_3,
        }).addRunToFront(new docx.Run({}).break()),
        new docx.Paragraph({
          alignment: AlignmentType.CENTER,
          text: 'РЕЗУЛЬТАТЫ ТЕСТА',
          heading: docx.HeadingLevel.HEADING_1,
        }),
        new docx.Paragraph({
          alignment: AlignmentType.CENTER,
          text: `Вы набрали: ${resultDto.percent} процентов`,
        }).addRunToFront(new docx.Run({}).break()),

        new docx.Paragraph({
          alignment: AlignmentType.RIGHT,
          text: `Дата время секунда`,
        }),
        new docx.Paragraph({}),
        new docx.Paragraph({
          alignment: AlignmentType.CENTER,
          text: `Ознакомлен (-а) с результатами теста                                ____________________`,
        }),
      ],
    });

    docx.Packer.toBlob(doc)
      .then((blob) => {
        saveAs(blob, 'example.docx');
      })
      .catch((err) => console.log(err));
  };

  return (
    <PageTemplate>
      <Container maxWidth="md" style={{ paddingTop: 50 }}>
        {resultDto ? (
          <Paper className={classes.paper}>
            <h1>Результаты тестирования:</h1>
            <h4 className={classes.userinfo}>
              {categoryTitle(resultDto.category)}
            </h4>
            <h4 className={classes.userinfo}>
              {`ФИО: ${resultDto.user.full_name}`}
            </h4>
            <h4 className={classes.userinfo}>
              {`Звания: ${resultDto.user.rank}`}
            </h4>
            <h4 className={classes.userinfo}>{`КПП: ${resultDto.user.kpp}`}</h4>
            <h4 className={classes.userinfo}>
              {`максимальный балл: ${resultDto.totalPoint}`}
            </h4>
            <h4 className={classes.userinfo}>
              {`ваш балл: ${resultDto.point}`}
            </h4>
            <h2 className={classes.userinfo}>
              {`Вы набрали: ${resultDto.percent} процентов`}
            </h2>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={goToCategories}
              >
                назад
              </Button>
              <Button variant="contained" color="primary" onClick={goHome}>
                выход
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDownloadDocx}
              >
                скачать Docx
              </Button>
            </div>
          </Paper>
        ) : (
          <h1>Загрузка...</h1>
        )}
      </Container>
    </PageTemplate>
  );
}
