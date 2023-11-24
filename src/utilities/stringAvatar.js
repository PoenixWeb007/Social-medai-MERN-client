export function stringAvatar(name) {
  return {
    sx: {
      //bgcolor: `primary.dark`,
    },
    children: <p>{`${name.split(" ")[0][0]}${name.split(" ")[1][0]}`}</p>,
  };
}
