import React from "react";
import { Paper, Text } from "@mantine/core";

const IssueCard = ( props: any ) => {

  return (
      <Paper shadow="xl" p="md">
        {props.children}
      </Paper>
  )

}

export default IssueCard;