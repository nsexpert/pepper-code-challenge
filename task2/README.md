For the code challenge 2, I changed four things.

1. fixed minor issue in regex to contain both urls(http and https) in a tag
2. fixed possible bugs in case that the input username is not 'John'.
 In this case, the user returns null, so the user.id can not be undefined.
3. promisfy two functions ( getReasonForWorstInfractionLinkified, getReasonForMostRecentInfractionLinkified) to run in parellel using promise.all
4. In order to get the most and worst infraction, I used javascript array reduce function instead of for loop statement.