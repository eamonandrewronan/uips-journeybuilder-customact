const { v1: Uuidv1 } = require('uuid');
const JWT = require('../utils/jwtDecoder');
const SFClient = require('../utils/sfmc-client');
const logger = require('../utils/logger');

/**
 * The Journey Builder calls this method for each contact processed by the journey.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.execute = async (req, res) => {
  // decode data
  const data = JWT(req.body);

  logger.info('execute');
  logger.info(JSON.stringify(data));

  try {

    var method;

    if (data.inArguments[0].APIMethod == 'on') {
      method = 'API';
    }
    else {
      method = 'FTP';
    }

    await SFClient.saveData(process.env.DATA_EXTENSION_EXTERNAL_KEY, [
      {
        keys: {
          SubscriberKey: data.inArguments[0].contactKey,
        },
        values: {
          Vendor: data.inArguments[0].DropdownOptions,
          Communication: data.inArguments[0].DropdownCommunications,
          Method: method,
        },
      },
    ]);
  } catch (error) {
    logger.error(error);
  } 


  res.status(200).send({
    status: 'ok',
  });
};

/**
 * Endpoint that receives a notification when a user saves the journey.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.save = async (req, res) => {

  logger.info('save');

  logger.info(JSON.stringify(req.body));

  res.status(200).send({
    status: 'ok',
  });
};

/**
 *  Endpoint that receives a notification when a user publishes the journey.
 * @param req
 * @param res
 */
exports.publish = (req, res) => {

  logger.info('publish');

  logger.info(JSON.stringify(req.body));

  res.status(200).send({
    status: 'ok',
  });
};

/**
 * Endpoint that receives a notification when a user performs
 * some validation as part of the publishing process.
 * @param req
 * @param res
 */
exports.validate = (req, res) => {

  logger.info(JSON.stringify(req.body));

  logger.info('validate');

  res.status(200).send({
    status: 'ok',
  });
};
