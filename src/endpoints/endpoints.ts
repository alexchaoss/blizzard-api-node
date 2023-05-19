import queries from '../database/queries'
import { Request, Response, Express } from 'express';

const genericEndpoint = (path: string, errorMessage: string, query: Function, server: Express) => {
  server.get(path, async (req: Request, res: Response) => {
    const queryRes = await query(req.params);
    if (queryRes?.rows) {
      res.send(queryRes.rows);
    } else {
      res.status(500);
      res.json({ message: errorMessage, error: queryRes });
    }
  });
}

export const initEndpoints = (server: Express) => {
  genericEndpoint('/', '{"status":"stopped"}', () => ({ rows: { status: 'running' } }), server);
  genericEndpoint('/achievements/:locale', 'Error fetching achievements', queries.getAchievements, server);
  genericEndpoint('/categories/:locale', 'Error fetching categories', queries.getAchievementCategory, server);
  genericEndpoint('/covenant/class/:classId/:locale', 'Error fetching covenant class spells', queries.getCovenantClassSpells, server);
  genericEndpoint('/covenant/:covId/:locale', 'Error fetching covenant spells', queries.getCovenantSpells, server);
  genericEndpoint('/instances/:locale', 'Error fetching instances', queries.getInstances, server);
  genericEndpoint('/playableSpecialization', 'Error fetching playable specializations', queries.getPlayableSpecialization, server);
  genericEndpoint('/reputations/:locale', 'Error fetching playable reputations', queries.getReputations, server);
}