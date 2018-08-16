describe('==== ASOCIO ====', () => {

  //Before each test we empty the database
  beforeEach((done) => {
      createAdmin();
      cleanTable('asocio');
      token = generateToken();
      done();
  });

  describe('GET /asocioj', () => {
    it('it should GET all the asocioj',(done) => {
      request
        .get('/asocioj')
        .expect(200)
      .then((success) => {done()}, (error) => {done(error)});
    });
  });

});
