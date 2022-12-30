import { database } from './initDB'

const getAchievements = async ({ locale }) => {
  const res = await database.query(
    `select av.id,
            av.name->>'${locale}' as "name",
            av.description->>'${locale}' as "description",
            av.points,
            av.display_order,
            av.is_account_wide,
            av.category_id,
            ac.name->>'${locale}' as "category",
            ac.parent_category_id,
            acc.name->>'${locale}' as "parent_category_name",
            aa.value as "icon"
    from achievements av
    left join achievement_categories ac
      on ac.id = av.category_id
    left join achievement_categories acc
      on acc.id = ac.parent_category_id
    left join achievement_media am
      on am.achievement_id = av.id
    left join achievement_assets aa
      on aa.achievement_media_id = am.id`)
    .catch((err: Error) => err);
  return res;
}

const getAchievementCategory = async ({ locale }) => {
  const res = await database.query(
    `select id,
            name->>'${locale}' as name,
            is_guild_category,
            display_order,
            parent_category_id,
            horde_quantity,
            horde_points,
            alliance_quantity,
            alliance_points
    from achievement_categories`)
    .catch((err: Error) => err);
  return res;
}

const getCovenantClassSpells = async ({ classId, locale }) => {
  console.log(classId, locale)
  const res = await database.query(
    `select co.id,
            co.covenant_id,
            co.playable_class_id,
            co.spell_tooltip_id,
            s.value as "icon",
            sp.name->>'${locale}' as "name",
            st.description->>'${locale}' as "description",
            st.cast_time->>'${locale}' as "cast_time",
            st.cooldown->>'${locale}' as "cooldown",
            st.range->>'${locale}' as "range",
            st.power_cost->>'${locale}' as "power_cost"
     from covenant_abilities co
     left join spells sp
       on sp.id = co.spell_tooltip_id
     left join spell_tooltips st
       on st.id = co.spell_tooltip_id
     left join spell_media sm
       on sm.spell_id = co.spell_tooltip_id
     left join spell_assets s
       on s.spell_media_id = sm.spell_id
     where co.playable_class_id = ${classId}`)
    .catch((err: Error) => err);
  return res;
}

const getCovenantSpells = async ({ covId, locale }) => {
  const res = await database.query(
    `select co.id,
            co.covenant_id,
            co.playable_class_id,
            co.spell_tooltip_id,
            s.value as icon,
            sp.name->>'${locale}' as"name",
            st.description->>'${locale}' as"description",
            st.cast_time->>'${locale}' as"cast_time",
            st.cooldown->>'${locale}' as"cooldown",
            st.range->>'${locale}' as"range",
            st.power_cost->>'${locale}' as"power_cost"
     from covenant_abilities co 
     left join spells sp
       on sp.id = co.spell_tooltip_id
     left join spell_tooltips st
       on st.id = co.spell_tooltip_id
     left join spell_media sm
       on sm.spell_id = co.spell_tooltip_id
     left join spell_assets s
       on s.spell_media_id = sm.spell_id
     where co.playable_class_id is NULL and covenant_id = ${covId}`)
    .catch((err: Error) => err);
  return res;
}

const getInstances = async ({ locale }) => {
  const res = await database.query(
    `select id,
            name->>'${locale}' as name,
            expansion_id
     from journal_instances
     where category_id = 'DUNGEON'
     order by expansion_id`)
    .catch((err: Error) => err);
  return res;
}

const getPlayableSpecialization = async () => {
  const res = await database.query(
    `select id,
            role_id,
            playable_class_id
     from playable_specializations`)
    .catch((err: Error) => err);
  return res;
}

const getReputations = async ({ locale }) => {
  const res = await database.query(
    `select id,
           parent_faction_id,
           name->>'${locale}' as "name",
           is_header
     from reputation_factions 
     order by parent_faction_id`)
    .catch((err: Error) => err);
  return res;
}

const queries = {
  getAchievements,
  getAchievementCategory,
  getCovenantClassSpells,
  getCovenantSpells,
  getInstances,
  getPlayableSpecialization,
  getReputations,
}

export default queries;