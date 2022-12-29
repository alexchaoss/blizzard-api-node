import queries from '../database/queries'

export const initEndpoints = (server) => {
  server.get('/achievements/:locale', async (req, res) => {
    const queryRes = await queries.getAchievements(req.params.locale);
    if (queryRes?.rows) {
      res.send(queryRes.rows);
    } else {
      res.status(500);
      res.render('error', { message: 'Error fetching achievements', error: queryRes });
    }
  });
  server.get('/categories/:locale', async (req, res) => {
    const queryRes = await queries.getAchievementCategory(req.params.locale);
    if (queryRes?.rows) {
      res.send(queryRes.rows);
    } else {
      res.status(500);
      res.render('error', { message: 'Error fetching categories', error: queryRes });
    }
  });
  server.get('/covenant/class/:classId/:locale', async (req, res) => {
    const queryRes = await queries.getCovenantClassSpells(req.params.classId, req.params.locale);
    if (queryRes?.rows) {
      res.send(queryRes.rows);
    } else {
      res.status(500);
      res.render('error', { message: 'Error fetching covenant class spells', error: queryRes });
    }
  });
  server.get('/covenant/:covId/:locale', async (req, res) => {
    const queryRes = await queries.getCovenantSpells(req.params.covId, req.params.locale);
    if (queryRes?.rows) {
      res.send(queryRes.rows);
    } else {
      res.status(500);
      res.render('error', { message: 'Error fetching covenant spells', error: queryRes });
    }
  });
  server.get('/instances/:locale', async (req, res) => {
    const queryRes = await queries.getInstances(req.params.locale);
    if (queryRes?.rows) {
      res.send(queryRes.rows);
    } else {
      res.status(500);
      res.render('error', { message: 'Error fetching instances', error: queryRes });
    }
  });
  server.get('/playableSpecialization', async (req, res) => {
    const queryRes = await queries.getPlayableSpecialization();
    if (queryRes?.rows) {
      res.send(queryRes.rows);
    } else {
      res.status(500);
      res.render('error', { message: 'Error fetching playable specializations', error: queryRes });
    }
  });
  server.get('/reputations/:locale', async (req, res) => {
    const queryRes = await queries.getReputations(req.params.locale);
    if (queryRes?.rows) {
      res.send(queryRes.rows);
    } else {
      res.status(500);
      res.render('error', { message: 'Error fetching playable reputations', error: queryRes });
    }
  });
}