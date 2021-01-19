import React, { useContext, useState, useEffect} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition,Dropdown, Divider, Header, Icon } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY, FETCH_AREA_QUERY } from '../util/graphql';


function Home() {

const options = [
  { key: '1', text: 'Self improvement', value: 'Self_improvement' },
  { key: '2', text: 'Relationship', value: 'Relationship' },
  { key: '3', text: 'Relation with world', value: 'Wolrd' },
  { key: '4', text: 'Health', value: 'Health' },
  { key: '5', text: 'Success', value: 'Success' },
  { key: '6', text: 'Dream', value: 'Dream' },
  { key: '7', text: 'Change the world', value: 'Change_the_world' },
  { key: '8', text: 'Brave to do', value: 'Brave_to_do' },
  { key: '9', text: 'Innovative Ideas', value: 'Innovative Ideas' },
  { key: '10', text: 'Job', value: 'Job' },
  { key: '11', text: 'Company', value: 'Company' },
  { key: '12', text: 'do', value: 'do' },
  { key: '13', text: 'Time', value: 'Time' },
  { key: '14', text: 'Pain', value: 'Pain' },
  { key: '15', text: 'Wealth', value: 'Wealth' },
  { key: '16', text: 'Speak', value: 'Speak' },
  { key: '17', text: 'Family', value: 'Family' },
  { key: '18', text: 'Young', value: 'Young' },
  { key: '19', text: 'Danger thought', value: 'Danger_thought' },
  { key: '20', text: 'Excuse', value: 'Excuse' },
  { key: '21', text: 'good or evil', value: 'good_or_evil' },
  { key: '22', text: 'Enemy', value: 'Enemy' },
  { key: '23', text: 'Justice', value: 'Justice' },
  { key: '24', text: 'Memory', value: 'Memory' },
  { key: '25', text: 'Today', value: 'Today' },
  { key: '26', text: 'Plan', value: 'Plan' },
  { key: '27', text: 'Revolution', value: 'Revolution' },
]



  const { user } = useContext(AuthContext);

  //////////////////////////////////////////////////////////
  //Thought Area
  const [areaValues,setAreaValues] = useState("Self_improvement");
  console.log("====areaValues====");
  console.log(areaValues);
  const on_change_for_thought_area = (e, { value }) => 
  {
    //console.log(value);
    setAreaValues(value)
  };

  /*
  const {
    loading,
    data: { getPosts: posts } 
  } = useQuery(FETCH_POSTS_QUERY);
  //*/

  let thoughtArea = "Self_improvement";
  console.log(thoughtArea);
  const {
    loading,
    data: { getAreaPosts: posts } 
  } = useQuery(FETCH_AREA_QUERY,
    {
      variables: {
        thoughtArea : areaValues
    },
  }
  );

  return (
    <Grid columns={1}>
        <Grid.Row>
          <Grid.Column>
            <Divider horizontal>
              <Header as='h3'>
                <Icon name='search' color="blue"/>
                  Search the Thought
              </Header>
            </Divider>
          </Grid.Column>
        <Grid.Column>
          <Dropdown
            options={options}
            placeholder='Search the Thought'
            search
            fluid
            selection
            allowAdditions
            scrolling
            value={areaValues}
            onAddItem={null}
            onChange={on_change_for_thought_area}
          />
          </Grid.Column>
        </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm area={areaValues} onAreaChange={setAreaValues} />
          </Grid.Column>
        )}
        {loading ? (
          <h1>loading...</h1>
        ) : (
          <Transition.Group>
            <Grid.Column>
              <Divider horizontal><h3>New Post</h3></Divider>
            </Grid.Column>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} area={areaValues}/>
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
