import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Records } from '../entity/Records';
import { Users } from '../entity/Users';

export async function getRecords(request: Request, response: Response) {
    const recordRepository = getManager().getRepository(Records);

    const record = await recordRepository.find();

    response.send(record);
}

export async function saveRecord(request: Request, response: Response) {
    const entityManager = getManager();
    const recordRepository = entityManager.getRepository(Records);
    const userRepository = entityManager.getRepository(Users);
    var dataIn = request.body;
    try {
        var user = await userRepository.find({ username: dataIn.Owner });
        if(user.length == 0) {
            throw Error();
        }
        var userId = user[0].id;
        // console.log("user id is ", userId);
        dataIn["user"] = userId;
        // console.log(dataIn);
        const newRecord = recordRepository.create(dataIn);

        const record = await recordRepository.save(newRecord);
        response.send(record);
    } catch (error) {
        console.log(error);
        response.send({ data: 'Error' });
    }
}

// export async function getAverage(request: Request, response: Response) {
//     const entityManager = getManager();
//     const userRepository = entityManager.getRepository(Users);
//     var dataIn = request.body;
//     var user = await userRepository.find({ username: dataIn.Owner });
//     var averageData = entityManager.query(`Select COUNT(company_name),company_name, SUM(Number_of_shares_bought) as avgNumBought ,SUM(Number_of_shares_sold) as avgNumSold,  "
//     + "AVG(Purchase_price) as avgPrice, AVG(Sold_price) as avgSoldPrice, AVG(Loss_or_gain_price) as avgLossGain from records where user_id = 3 GROUP BY company_name `);

//     response.send(averageData);
// }
