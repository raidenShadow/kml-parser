import fs from 'fs';
import path from 'path';
import { parseStringPromise, Builder } from 'xml2js';

class Parser {
    private builder: Builder;
    constructor() {
        this.builder = new Builder({
            cdata: true
        });
    }

    public async readKML(filename: string): Promise<any> {
        if (filename.split('.').pop() !== 'kml') {
            throw new Error('File extenstion is not supported');
        }
        const raw_kml: Buffer = fs.readFileSync(path.join(__dirname, `./assets/${filename}`));
        const parse_result = await parseStringPromise(raw_kml);
        return parse_result;
    }

    public writeKML(xml: string): void {
        fs.writeFileSync(path.join(__dirname, `./assets/eddited.kml`), xml);
    }

    public convertXML(input: any): string {
        const xml: string = this.builder.buildObject(input);
        return xml;
    }
}

export default (new Parser());