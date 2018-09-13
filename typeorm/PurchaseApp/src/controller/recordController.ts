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

export async function deleteRecord(request: Request, response: Response) {
    const entityManager = getManager();
    const recordRepository = entityManager.getRepository(Records);
    var dataIn = request.body;
    try {
        var recordToDelete = await recordRepository.findByIds([dataIn.id]);
        console.log(recordToDelete);
        const record = await recordRepository.remove(recordToDelete);
        response.send({data: "Deleted an item"});
    } catch (error) {
        console.log(error);
        response.send({ data: 'Error' });
    }
}

export async function getAverage(request: Request, response: Response) {
    const entityManager = getManager();
    const userRepository = entityManager.getRepository(Users);
    var dataIn = request.body;
    console.log(dataIn);
    var user = await userRepository.find({ username: dataIn.owner });
    console.log(user);
    // var averageData = await entityManager.query(`select COUNT(company_name),company_name, SUM(Number_of_shares_bought) as avgNumBought ,SUM(Number_of_shares_sold) as avgNumSold, 
    // AVG(Purchase_price) as avgPrice, AVG(Sold_price) as avgSoldPrice, AVG(Loss_or_gain_price) as avgLossGain from records where user_id = ? GROUP BY company_name `, [user[0].id]);

    var averageData = await entityManager
                            .createQueryBuilder()
                            .select("COUNT(company_name)", "count")
                            .addSelect("company_name")
                            .addSelect("SUM(Number_of_shares_bought)", "totalNumBought")
                            .addSelect("SUM(Number_of_shares_sold)", "totalNumSold")
                            .addSelect("AVG(Purchase_price)", "avgPrice")
                            .addSelect("AVG(Sold_price)", "avgSoldPrice")
                            .addSelect("AVG(Loss_or_gain_price)", "avgLossGain")
                            .from(Records, "records")
                            .where("user_id = :id", {id: user[0].id} )
                            .groupBy("company_name")
                            .getRawMany();
    console.log(averageData);
    response.send(averageData);
}
