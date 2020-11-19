import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import {
  AlignmentType,
  Document,
  Media,
  Packer,
  Paragraph,
  TextRun,
} from 'docx';
import { saveBufferFile } from '../utils/file';
import { ResultDto, UserEntity } from './quiz.entity';

interface CreateDocumentDto {
  userImage: string;
  user: UserEntity;
  result: ResultDto;
  destinationPath: string;
}

export class DocxService {
  async createDocument(dto: CreateDocumentDto) {
    const doc = new Document();
    const image = Media.addImage(doc, fs.readFileSync(dto.userImage));

    doc.addSection({
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun('ТЕСТИРОВАНИЕ')],
        }),
        new Paragraph({
          children: [
            new Paragraph({
              alignment: AlignmentType.LEFT,
              children: [
                new TextRun(dto.user.rank),
                new TextRun(dto.user.full_name),
                new TextRun(dto.user.kpp),
              ],
            }),
            image,
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun('РЕЗУЛЬТАТЫ ТЕСТА')],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun(`Вы набрали: ${dto.result.percent} процентов`),
          ],
        }),
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const fileName = `result-${uuidv4()}.docx`;
    const docPath = path.join(dto.destinationPath, fileName);
    await saveBufferFile(buffer, docPath);
    return fileName;
  }
}
