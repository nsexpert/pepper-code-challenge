/**
 * This code needs help.
 */

import { getUserByName, getUserInfractions } from './user-api.js';

/**
 * @param {string} username
 */
function getReasonForWorstInfractionLinkifiedAsync(username) {
	return new Promise(function(resolve, reject) {
		getUserByName(username, resolve, reject)
	})
	.then((user) => {
		if (!user) return null;
		return new Promise(function(resolve, reject) {
			getUserInfractions(user.id, resolve, reject)
		})
	})
	.then((result) => {
		if (!result) return null;
		// find most recent infraction with most infraction points
		// find most recent infraction
		return result.reduce(function(prev, current) {
			return (prev.points > current.points) ? prev : current
		}).reason.replace(
			/\bhttps?:\/\/\S+/,
			match => '<a href="' + match + '">' + match + '</a>'
		);
	})
}

/**
 * @param {string} name
 */
function getReasonForMostRecentInfractionLinkifiedAsync(name) {
	return new Promise(function(resolve, reject) {
		getUserByName(name, resolve, reject)
	})
	.then((user) => {
		if (!user) return null;
		return new Promise(function(resolve, reject) {
			getUserInfractions(user.id, resolve, reject)
		})
	}).then((result) => {
		if (!result) return null;
		// find most recent infraction
		return result.reduce(function(prev, current) {
			return (prev.id > current.id) ? prev : current
		}).reason.replace(
			/\bhttps?:\/\/\S+/,
			match => '<a href="' + match + '">' + match + '</a>'
		);
	})
}

/**
 * Returns reason of the worst & the most recent user infraction with linkified urls
 * @param {string} username
 * @returns {Promise.<Object>}
 */
export function getRelevantInfractionReasons(username)
{
	return Promise.all([getReasonForWorstInfractionLinkifiedAsync(username), getReasonForMostRecentInfractionLinkifiedAsync(username)])
	.then(([worst, mostRecent]) => {
		if (worst && mostRecent)
			return {mostRecent, worst}
		else if (worst && !mostRecent) 
			return {worst}
		else if (!worst && mostRecent) 
			return {mostRecent}
		else
			return {}
	})
}
