import styled from 'styled-components'

export const Image = styled.svg`
  color: grey;
  position: relative;
  margin: .4rem;
  width: 7%;
  height: 7%;
  scroll-behavior: smooth;
  & g.skin {
    cursor: pointer;
  }
`


export function SvgRocket() {
  return (
    <Image viewBox="0 0 29 29"
      xmlns="http://www.w3.org/2000/svg">
      <g className="skin">
        <path d="M14.496 21H9.564l1.014 2h2.904l1.014-2zm1.811-17.238C14.9 2.409 13.228 2.465 11.995 0c-1.245 2.489-2.988 2.359-4.38 3.7C3.591 7.572 6.442 15.101 9.012 20h5.977c2.57-4.899 5.443-12.269 1.318-16.238zM12 13a3 3 0 110-6 3 3 0 010 6zm1.5-3c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5.673-1.5 1.5-1.5 1.5.673 1.5 1.5zM4.699 22.594c.097.31.411 1.406.411 1.406H3.834s-.801-1.271-1.418-2.368C2.132 21.127 2 20.726 2 20.35c0-.736.507-1.372 1.375-2.483l1.591-2.058a39.107 39.107 0 001.854 4.284c-.36.212-.975.578-1.27.773-.634.418-1.126.847-.851 1.728zM22 20.349c0 .376-.132.778-.416 1.283C20.967 22.729 20.166 24 20.166 24h-1.275s.312-1.096.41-1.406c.275-.881-.217-1.31-.85-1.729-.296-.195-.91-.56-1.271-.772a39.44 39.44 0 001.859-4.276l1.585 2.05c.869 1.11 1.376 1.746 1.376 2.482z"></path>
      </g>
    </Image>
  );
}
