import styled from 'styled-components'

const FancyButton = styled.button`
background:#510c7e;
display:block;
margin:auto;
color:#fff;
height:50px;
width:150px;
border:8px solid #fb8cb9;
border-radius: 25px;
font-size: 18px;
text-transform: uppercase;
font-family: pixelade;
cursor: pointer;
margin-top:15px;
&:hover{
  background:darkgray;
  border-color:lightgray;
}
`

export default FancyButton