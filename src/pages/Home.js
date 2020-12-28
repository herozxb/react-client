import React, { useContext,useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition,Dropdown, Divider, Header, Icon } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

const options = [
  { key: 'English', text: 'English', value: 'English' },
  { key: 'French', text: 'French', value: 'French' },
  { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
  { key: 'German', text: 'German', value: 'German' },
  { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
]

function Home() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data: { getPosts: posts } 
  } = useQuery(FETCH_POSTS_QUERY);

  const {state,setState} = useState("");
  const {currentValues,setCurrentValues} = useState("");

  const handleAddition = (e, { value }) => {
    setState((prevState) => ({
      options: [{ text: value, value }, ...prevState.options],
    }))
  };

  const handleChange = (e, { value }) => setState({ currentValues: value });
  //()=> setCurrentValues(state);

  return (
    <Grid columns={1}>
      <Grid.Row>
        <Grid.Column>
          <Divider horizontal>
            <Header as='h3'>
              <Icon name='search' color="blue"/>
                搜索 思想 领域
            </Header>
          </Divider>
        </Grid.Column>
      <Grid.Column>
        <Dropdown
          options={null}
          placeholder='搜索 思想 领域'
          search
          fluid
          selection
          multiple
          allowAdditions
          value={null}
          onAddItem={null}
          onChange={null}
        />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>loading...</h1>
        ) : (
          <Transition.Group>
            <Grid.Column>
              <Divider horizontal><h3>最新</h3></Divider>
            </Grid.Column>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
