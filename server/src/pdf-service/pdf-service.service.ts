import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class PdfServiceService {
    async createPdf(data: any): Promise<Buffer> {
        const browser = await puppeteer.launch({
            // headless: true,
            executablePath: '/usr/bin/google-chrome',
            ignoreDefaultArgs: ['--disable-extensions'],
            args: ['--no-sandbox'],
        });
        const page = await browser.newPage();

        const rowData = data.dataInfo.map((item, index) => {
            let res = `<tr>
                <td style="text-align: center">${++index}</td>
                <td>${item.placeLocation}</td>
                <td style="text-align: center"><b>${item.placeLocationCount}</b></td>
            </tr>`
            if (item.children.length > 0) {
                item.children.forEach((child, index) => {

                    res += `<tr>
                        <td style="text-align: center"></td>
                        <td>- ${child.placeLocation}</td>
                        <td style="text-align: center">${child.placeLocationCount}</td>
                    </tr>`

                    if (child.children?.length > 0) {
                        child.children.forEach((child2, index) => {
                            res += `<tr>
                                <td style="text-align: center"></td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ${child2.placeLocation}</td>
                                <td style="text-align: center">${child2.placeLocationCount}</td>
                            </tr>`
                        })
                    }
                })
            }

            return res
        })


        const content = `
        <html>
            <head>
            <link href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet">
                <style>
                    table {
                        border-collapse: collapse;
                        width: 100%;
                    }

                    thead tr th {
                        padding: 10px;
                        border: 1px solid #dddddd;
                    }

                    td {
                        border: 1px solid #dddddd;
                        text-align: left;
                        padding: 8px;
                    }
                </style>
            </head>
            <body>
                <h1 style="text-align: center; margin-top: 45px">รายงาน - การแจ้งพบเห็นของหาย</h1>
                <p style="text-align: center;">ระหว่างวันที่ <b>${data.dateStart}</b> ถึง <b>${data.dateEnd}</b></p>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th style="font-size: 20px;">ชื่อสถานที่</th>
                            <th style="font-size: 20px">จำนวนครั้ง</th>
                        </tr>
                    </thead>
                    ${rowData.join('')}
                </table>
            </body>
            </html>
        `

        await page.setContent(content);
        await page.evaluate(() => {
            const style = document.createElement('style');
            style.innerHTML = '* { font-family: "Sarabun", sans-serif !important }';
            document.head.appendChild(style);
        });

        // wait for font to load
        await page.waitForNetworkIdle();

        const pdf = await page.pdf({ format: 'A4', printBackground: true });
        // await browser.close();
        return pdf;
    }

    async createPdfLosing(data: any): Promise<Buffer> {
        const browser = await puppeteer.launch({
            // headless: true,
            executablePath: '/usr/bin/google-chrome',
            ignoreDefaultArgs: ['--disable-extensions'],
            args: ['--no-sandbox'],
        });
        const page = await browser.newPage();

        const rowData = data.dataInfo.map((item, index) => {
            let res = `<tr>
                <td style="text-align: center">${++index}</td>
                <td>${item.placeLocation}</td>
                <td style="text-align: center"><b>${item.placeLocationCount}</b></td>
            </tr>`

            return res
        })


        const content = `
        <html>
            <head>
            <link href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet">
                <style>
                    table {
                        border-collapse: collapse;
                        width: 100%;
                    }

                    thead tr th {
                        padding: 10px;
                        border: 1px solid #dddddd;
                    }

                    td {
                        border: 1px solid #dddddd;
                        text-align: left;
                        padding: 8px;
                    }
                </style>
            </head>
            <body>
                <h1 style="text-align: center; margin-top: 45px">รายงาน - ประกาศตามหาของหาย</h1>
                <p style="text-align: center;">ระหว่างวันที่ <b>${data.dateStart}</b> ถึง <b>${data.dateEnd}</b></p>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th style="font-size: 20px;">ชื่อสถานที่</th>
                            <th style="font-size: 20px">จำนวนครั้ง</th>
                        </tr>
                    </thead>
                    ${rowData.join('')}
                </table>
            </body>
            </html>
        `

        await page.setContent(content);
        await page.evaluate(() => {
            const style = document.createElement('style');
            style.innerHTML = '* { font-family: "Sarabun", sans-serif !important }';
            document.head.appendChild(style);
        });

        // wait for font to load
        await page.waitForNetworkIdle();

        const pdf = await page.pdf({ format: 'A4', printBackground: true });
        // await browser.close();
        return pdf;
    }
}

