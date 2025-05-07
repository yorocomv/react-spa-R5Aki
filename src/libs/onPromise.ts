// https://github.com/orgs/react-hook-form/discussions/8020#discussioncomment-2584580
export default function onPromise<T>(promise: (event: React.SyntheticEvent) => Promise<T>) {
  return (event: React.SyntheticEvent) => {
    if (promise) {
      promise(event).catch((error) => {
        console.error('Unexpected error', error);
      });
    }
  };
}
