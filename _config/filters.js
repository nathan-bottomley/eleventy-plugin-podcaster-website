import { DateTime } from "luxon";

export default function(eleventyConfig) {
	eleventyConfig.addFilter('readableDate', function (date) {
		if (date instanceof Date) {
			date = date.toISOString()
		}
		const result = DateTime.fromISO(date, {
			zone: 'UTC'
		})
		return result.setLocale('en-GB').toLocaleString(DateTime.DATE_HUGE)
	})

	eleventyConfig.addFilter('shortDate', function (date) {
		if (date instanceof Date) {
			date = date.toISOString()
		}
		const result = DateTime.fromISO(date, {
			zone: 'UTC'
		})
		return result.setLocale('en-GB').toLocaleString(DateTime.DATE_MED)
	})

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
	});

};
