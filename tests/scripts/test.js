const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const booker = require("../data/createBooking.json");
const user = require("../data/userAuth.json");
const updateBooking = require("../data/updateBooking.json");

chai.use(chaiHttp);

describe("Booking API", () => {
  const baseUrl = "https://restful-booker.herokuapp.com";
  let token;
  let bookingId;

  before(async () => {
    try {
      const res = await chai
        .request(baseUrl)
        .post("/auth")
        .send(user)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

      expect(res).to.have.status(200);
      expect(res.body.token).to.exist;
      token = res.body.token;
      // console.log(token);
    } catch (error) {
      throw error;
    }
  });

  it("should create a new booking", async () => {
    try {
      const res = await chai
        .request(baseUrl)
        .post("/booking")
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(booker);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.bookingid).to.be.a("number");
      bookingId = res.body.bookingid;
      expect(res.body.booking.firstname).to.equal(booker.firstname);
      expect(res.body.booking.lastname).to.equal(booker.lastname);
      expect(res.body.booking.totalprice).to.equal(booker.totalprice);
      expect(res.body.booking.depositpaid).to.equal(booker.depositpaid);
      expect(res.body.booking.bookingdates.checkin).to.equal(
        booker.bookingdates.checkin
      );
      expect(res.body.booking.bookingdates.checkout).to.equal(
        booker.bookingdates.checkout
      );
      expect(res.body.booking.additionalneeds).to.equal(booker.additionalneeds);
      // console.log(res.body, "<<<add");
    } catch (error) {
      throw error;
    }
  }).timeout(15000);

  it("should get booking", async () => {
    try {
      const res = await chai
        .request(baseUrl)
        .get(`/booking/${bookingId}`)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.firstname).to.equal(booker.firstname);
      expect(res.body.lastname).to.equal(booker.lastname);
      expect(res.body.totalprice).to.equal(booker.totalprice);
      expect(res.body.depositpaid).to.equal(booker.depositpaid);
      expect(res.body.bookingdates.checkin).to.equal(
        booker.bookingdates.checkin
      );
      expect(res.body.bookingdates.checkout).to.equal(
        booker.bookingdates.checkout
      );
      expect(res.body.additionalneeds).to.equal(booker.additionalneeds);
      // console.log(res.body, "<<<get");
    } catch (error) {
      throw error;
    }
  }).timeout(15000);

  it("should update booking", async () => {
    try {
      const res = await chai
        .request(baseUrl)
        .put(`/booking/${bookingId}`)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .set("Cookie", `token=${token}`)
        .send(updateBooking);
      // console.log(res.body, "<<<update>>>");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.firstname).to.equal(updateBooking.firstname);
      expect(res.body.lastname).to.equal(updateBooking.lastname);
      expect(res.body.totalprice).to.equal(updateBooking.totalprice);
      expect(res.body.depositpaid).to.equal(updateBooking.depositpaid);
      expect(res.body.bookingdates.checkin).to.equal(
        updateBooking.bookingdates.checkin
      );
      expect(res.body.bookingdates.checkout).to.equal(
        updateBooking.bookingdates.checkout
      );
      expect(res.body.additionalneeds).to.equal(updateBooking.additionalneeds);
    } catch (error) {
      throw error;
    }
  });

  it("should partial update booking", async () => {
    try {
      const updateName = {
        firstname: "John",
        lastname: "Smith",
      };
      const res = await chai
        .request(baseUrl)
        .patch(`/booking/${bookingId}`)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .set("Cookie", `token=${token}`)
        .send(updateName);
      // console.log(res.body, "<<<update nane>>>");
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
      expect(res.body.firstname).to.equal(updateName.firstname);
      expect(res.body.lastname).to.equal(updateName.lastname);
    } catch (error) {
      throw error;
    }
  });

  it("should delete booking", async () => {
    try {
      const res = await chai
        .request(baseUrl)
        .delete(`/booking/${bookingId}`)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .set("Cookie", `token=${token}`);

      // console.log(token, bookingId);

      expect(res).to.have.status(201);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  it("should return 405 when delete missing booking", async () => {
    try {
      const res = await chai
        .request(baseUrl)
        .delete(`/booking/${bookingId}`)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .set("Cookie", `token=${token}`);

      // console.log(token, bookingId);
      expect(res).to.have.status(405);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  it("should return 404 when find missing booking", async () => {
    try {
      const res = await chai
        .request(baseUrl)
        .get(`/booking/${bookingId}`)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");

      expect(res).to.have.status(404);
    } catch (error) {
      throw error;
    }
  }).timeout(15000);
});
