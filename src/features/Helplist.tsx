
import  { useEffect, useState } from 'react';
import { View, Image  } from 'react-native';
import { Button, List, Text, } from "react-native-paper";
import Styles from "../styles/styles";
import { Header, CustomAccordion}  from "../Components/CustomComponents"
import React from 'react';


type Course = {
id: string;
nickname: string;
description: string;
}

// Helplist
const Helplist = () => {

  const [checked, setChecked] = useState(new Map());
  const [expanded, setExpanded] = useState(new Map());
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Course[]>([]);


  const handleCheck = (id: string) => {
    const currentChecked = checked.get(id) || false;
    setChecked(new Map(checked.set(id, !currentChecked)));
  };

  const handleExpand = (id: string) => {
    const currentExpanded = expanded.get(id) || false;
    setExpanded(new Map(expanded.set(id, !currentExpanded)));
  };


  const getCourse = async () => {
    try {
      const response = await fetch('http://chanv2.duckdns.org:5084/api/Helplist?course=ikt201-g');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCourse();
  }, []);

  
  return (
    <View style={Styles.lm_background}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
      </View>
      <Image style={[Styles.logo]} source={require('.././img/halpy3.png')} />
      <Header title='Helplist'/>
      <List.Section style= {Styles.lm_background}>
        {data.map((item, index) => (
          <CustomAccordion
            key={item.id}
            title={item.nickname}
            titleStyle={[Styles.lm_text,
              { paddingHorizontal: 16, paddingVertical: 2, fontSize:14 },
            ]}
            style={[
              index % 2 === 0 ? Styles.lm_whitelist : Styles.lm_bluelist]}
            expanded={expanded.get(item.id) || false}
            onPress={() => handleExpand(item.id)}
            description={item.description}
            descriptionStyle={{ paddingHorizontal: 2, paddingVertical: 5 }}
            onCheck={() => handleCheck(item.id)}
            checked={checked.get(item.id) || false}
          />
        ))}
      </List.Section>
    </View>
  );
};

export default Helplist;