export const LIST_ENGAGMENT_WIDGETS_QUERY = /* graphql */ `
  query listEngagementWidgetSummaries(
    $accountId: String!, 
    $offset: Float, 
    $limit: Float
  ) {
    engagementWidgets(
        accountId: $accountId,
        input: {
            offset: $offset, 
            limit: $limit
        }
    ) {
        count
        limit
        offset
        items {
            _id
            id
            data {
                locationId
                config {
                    name
                }
            }
        }
    }
  }
`;
