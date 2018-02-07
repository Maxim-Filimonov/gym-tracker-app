const expect = require('chai').expect;
const mongoose = require('mongoose');
const {TEST_DATABASE_URL} = require('../../config');
const {GymGoerModel} = require('../../models/GymGoerModel');

mongoose.Promise = global.Promise;

describe('# GymGoerModel', function () {

  // Connect to the database
  before(function () {
    return new Promise((resolve, reject) => {
      mongoose.connect(TEST_DATABASE_URL, err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  });

  // Clean the database before each test
  beforeEach(function () {
    return mongoose.connection.dropDatabase();
  });

  // Disconnect from the database
  after(function () {
    return mongoose.disconnect();
  });

  const TEST_EMAIL = 'alex@bandisch.com';

  const createTestGymGoer = (email) => {
    return GymGoerModel.createGymGoer(email);
  };

  const findTestGymGoer = (email) => {
    return GymGoerModel.findGymGoerByEmail(email);
  };

  const addTestTrainingSession = (gymGoerId, sessionType) => {
    return GymGoerModel.addTrainingSession(gymGoerId, sessionType);
  };

  describe('# GymGoerModel.createGymGoer', function () {

    it('should throw an Error is the email is not provided', function () {
      return createTestGymGoer()
        .catch(err => {
          expect(err).to.be.an.instanceOf(Error);
        });
    });

    it('should throw an Error is the email is an empty string', function () {
      return createTestGymGoer("")
        .catch(err => {
          expect(err).to.be.an.instanceOf(Error);
        });
    });

    it('should throw an Error if the email address is already in the database', function () {
      return createTestGymGoer(TEST_EMAIL)
        .then(() => createTestGymGoer(TEST_EMAIL))
        .catch(err => {
          expect(err).to.be.an.instanceOf(Error);
        });
    });

    it('should create and provide the newly created, serialized GymGoer', function () {
      return createTestGymGoer(TEST_EMAIL)
        .then(gymGoer => {
          expect(gymGoer).to.be.an.instanceOf(Object);
          expect(gymGoer).to.have.keys(['id', 'email', 'trainingSessions']);
        });
    });

  });

  describe('# GymGoerModel.findGymGoerByEmail', function () {

    it('should throw an Error if no email is provided', function () {
      return findTestGymGoer()
        .catch(err => {
          expect(err).to.be.an.instanceOf(Error);
        })
    });

    it('should return null if it cannot find the GymGoer by email', function () {
      return findTestGymGoer(TEST_EMAIL)
        .then(gymGoer => {
          expect(gymGoer).to.be.equal(null);
        });
    });

    it('should find GymGoer by email and provide a serialised GymGoer', function () {
      return createTestGymGoer(TEST_EMAIL)
        .then(_gymGoer => {
          return findTestGymGoer(TEST_EMAIL)
            .then(gymGoer => {
              expect(gymGoer).to.be.an.instanceOf(Object);
              expect(gymGoer).to.have.keys(['id', 'email', 'trainingSessions']);
            });
        });
    });

  });

  describe('# GymGoerModel.addTrainingSession', function () {

    it('should throw an Error if the GymGoer ID does not exist in the database', function () {
      return GymGoerModel
        .addTrainingSession('5a777eed2f47b02f9d01757c', 'chest')
        .catch(err => {
          expect(err).to.be.an.instanceOf(Error);
        });
    });

    it('should throw an Error if the GymGoer ID is not an ObjectID', function () {
      return GymGoerModel
        .addTrainingSession('banana', 'chest')
        .catch(err => {
          expect(err).to.be.an.instanceOf(Error);
        });
    });

    it('should add a training session if it does NOT exist for today and return the session object', function () {
      return createTestGymGoer(TEST_EMAIL)
        .then(gymGoer => {
          return addTestTrainingSession(gymGoer.id, 'chest')
            .then(result => {
              expect(result).to.be.an.instanceOf(Object);
              expect(result).to.have.keys(['created', 'sessionType']);
              return GymGoerModel.findById(gymGoer.id)
                .then(gGoer => { return gGoer.serializeAll() });
            })
            .then(dbGymGoer => {
              expect(dbGymGoer.trainingSessions.length).to.be.equal(1);
            });
        })
    });

    it('should not add a training session if one for today already exist and return the session object', function () {
      return createTestGymGoer(TEST_EMAIL)
        .then(gymGoer => {
          return addTestTrainingSession(gymGoer.id, 'chest')
            .then(addedSession => {
              return addTestTrainingSession(gymGoer.id, 'chest')
            })
            .then(_addedSession => {
              return GymGoerModel.findById(gymGoer.id)
                .then(gGoer => { return gGoer.serializeAll() });
            })
            .then(dbGymGoer => {
              expect(dbGymGoer.trainingSessions.length).to.be.equal(1);
            });
        })
    });
  })
});