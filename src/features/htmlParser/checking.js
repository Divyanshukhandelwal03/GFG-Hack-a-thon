export function checking(data,parsed_Data){
  if((!data.element||data.element=='')&&(!data.class||data.class=='')&&(!data.id||data.id==''))
  {
    // console.log('1');
    return 1;
  }
  else if((!data.element||data.element=='')&&(!data.class||data.class==''))
  {
    // console.log('2');
    if(parsed_Data.id == data.id)
    {
      if(!data.child)
      {
        return 1;
      }
      for(let i = 0 ; i<parsed_Data.childNodes.length ; i++)
      {
        if(parsed_Data.childNodes[i].nodeType!=2)
        {
          let output = checking(data.child , parsed_Data.childNodes[i]);
          if(output == 1)
          {
            return 1;
          }
        }
      }
    }
    return 0;
  }
  else if((!data.element||data.element=='')&&(!data.id||data.id==''))
  {
    // console.log('3');
    let num = parsed_Data.classList._set;
    let output = 0 ;
    for(let value of num)
    {
      if(value == data.class)
      {
        output = 1;
        break;
      }
    }
    if(output == 1)
    {
      if(!data.child)
      {
        return 1;
      }
      for(let i = 0 ; i<parsed_Data.childNodes.length ; i++)
      {
        if(parsed_Data.childNodes[i].nodeType!=2)
        {
          let output = checking(data.child , parsed_Data.childNodes[i]);
          if(output == 1)
          {
            return 1;
          }
        }
      }
    }
    return 0 ;
  }
  else if((!data.class||data.class=='')&&(!data.id||data.id==''))
  {
    // console.log('4');
      if(parsed_Data.rawTagName == data.element)
      {
         if(data.child)
         {
          for(let j = 0 ; j<parsed_Data.childNodes.length ; j++)
         {
           if(parsed_Data.childNodes[j].nodeType == 1)
           {
           let output = checking(data.child , parsed_Data.childNodes[j]);
           if(output == 1)
           {
             return 1;
           }
           }
         }
         }
         else{
          return 1;
         }
         
      }
    return 0;
  }
  else if(!data.class||data.class=='')
  {
    // console.log('5');
      if(parsed_Data.rawTagName==data.element && parsed_Data.id==data.id)
      {
         if(!data.child)
         {
          return 1;
         }
         for(let j = 0 ; j<parsed_Data.childNodes.length ; j++)
         {
          if(parsed_Data.childNodes[j].nodeType==1)
          {
            let output = checking(data.child , parsed_Data.childNodes[j]);
            if(output == 1)
            {
              return 1;
            }
          }
         }
      }
    return 0 ;
  }
  else if(!data.id||data.id=='')
  {
    // console.log('6');
      if(parsed_Data.rawTagName == data.element)
      {
        let num = parsed_Data.classList._set;
        let output = 0 ; 
          for(let value of num)
          {
            if(value == data.class)
            {
              output  =1;
              break;
            }
          }
          if(output == 0)
          {
            return 0;
          }
          if(!data.child)
          {
            return 1;
          }
          for(let j = 0 ; j< parsed_Data.childNodes.length ;j++ )
          {
            if(parsed_Data.childNodes[j].nodeType==1)
            {
              let outp = checking(data.child , parsed_Data.childNodes[j]);
              if(outp == 1)
              {
                return 1;
              }
            }
          }
      }
    return 0 ;
  }
  else if(!data.element||data.element=='')
  {
    // console.log('7');
    let num = parsed_Data.classList._set;
    let output = 0 ; 
    for(let value of num)
    {
      if(value == data.class)
      {
        output  =1;
        break;
      }
    }
    if(output == 0)
    {
      return 0;
    }
    if(parsed_Data.id  == data.id)
    {
      if(!data.child)
      {
        return 1;
      }
       for(let i = 0 ; i<parsed_Data.childNodes.length ; i++)
       {
        if(parsed_Data.childNodes[i].nodeType == 1)
        {
          let output = checking(data.child , parsed_Data.childNodes[i]);
          if(output==1)
          {
            return 1;
          }
        }
       }
    }
    return 0;
  }
  else{
    // console.log('8');
    let num = parsed_Data.getElementsByTagName(data.element);
    if(num == null||num.length == 0)
    {
      return 0;
    }
    for(let i = 0 ; i<num.length ; i++)
    {
         if(num[i].id!=null&&num[i].id!=''&&num[i].id == data.id)
         {
          let num2 = num[i].classList._set ;
          let output = 0 ; 
          for(let value of num2)
          {
            if(value == data.class)
            {
              output = 1 ;
              break;
            }
          }
          if(output == 1)
          {
            if(!data.child)
            {
              return 1;
            }
            for(let j = 0 ; j<num[i].childNodes.length ; j++)
            {
              if(num[i].childNodes[j].nodeType == 1)
              {
                let outp = checking(data.child , num[i].childNodes[j]);
                if(outp == 1)
                {
                  return 1;
                }
              }
            }
          }
         }
    }
    return 0;
    
  }
}