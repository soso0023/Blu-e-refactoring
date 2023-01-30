const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const mentoringProvider = require("./mentoringProvider");
const mentoringDao = require("./mentoringDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

// const jwt = require("jsonwebtoken");


// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createProblem = async function (userId, subject, unit, problem, contents, image) {
    try {

        const insertProblemParams = [userId, subject, unit, problem, contents, image];

        const connection = await pool.getConnection(async (conn) => conn);

        const problemIdResult = await problemDao.insertProblem(connection, insertProblemParams);
        console.log(`추가된 문제 : ${problemIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createProblem Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deleteProblem = async function(problemId){
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const problemIdResult = await problemDao.deleteProblem(connection, problemId);
        console.log(`삭제된 문제 : ${problemIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deleteProblem Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};