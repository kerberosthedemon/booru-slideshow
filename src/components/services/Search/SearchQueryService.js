export class SearchQueryService {

  getQueryParameters = (searchQuery, booruConfiguration) => {
    return {
      ...this.getTagsQuery(searchQuery),
      ...this.getPageQuery(searchQuery, booruConfiguration),
      ...this.getLimitQuery(searchQuery)
    };
  }

  getTagsQuery(searchQuery) {
    let query = '';
    if (searchQuery.tags)
      searchQuery.tags.forEach((tag) => { query = query.concat('+' + tag) });
    return { tags: query };
  }

  getPageQuery(searchQuery, booruConfiguration) {
    const pageNumber = searchQuery.page + booruConfiguration.startPageIndexOffset;
    return booruConfiguration.isXMLFormat ? { pid: pageNumber } : { page: pageNumber };
  }

  getLimitQuery(searchQuery) {
    const resultsPerPage = searchQuery.resultsPerPage ?? 0;
    return { limit: resultsPerPage };
  }
}