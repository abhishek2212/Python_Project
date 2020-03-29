const advanceOptionBtn = document.querySelector('#advanceOptions');
const advancesOptionBox = document.querySelector('.advances-option-box');
advanceOptionBtn.addEventListener("click", e=>{
    let c = advancesOptionBox.classList;
    if(c.contains('hidden'))
        {   
            e.target.innerHTML = "Hide advance options";
            c.remove('hidden');
        }
    else {
            e.target.innerHTML = "Show advance options";
            c.add('hidden');
        }
});

const scanType =document.querySelector('#scanType');
const advanceOptionBtnBox = document.querySelector('#advanceOptionBtnBox');
scanType.addEventListener('change',function(e){
//console.log(scanType.value);
const scanTypeVal=scanType.value;

if(scanTypeVal!=='nil')
{ // this block will execute if selection list value is not nil
    if(scanTypeVal==='nmap')
    {
        document.getElementById('f1').innerHTML="-O";
        document.getElementById('f2').innerHTML="-sS";
        document.getElementById('f3').innerHTML="-C";
        document.getElementById('f4').innerHTML="-sC";
        document.getElementById('f5').innerHTML="-sV";
        

        document.getElementById('chkbx1').value="-O";
        document.getElementById('chkbx2').value="-sS";
        document.getElementById('chkbx3').value="-C";
        document.getElementById('chkbx4').value="-sC";
        document.getElementById('chkbx5').parentNode.parentNode.classList.remove('hidden');
        document.getElementById('chkbx5').value="-sV";
        advanceOptionBtnBox.classList.contains('hidden') ? advanceOptionBtnBox.classList.remove('hidden'): null
        
    }else if(scanTypeVal==='whois' || scanTypeVal === 'nikto'){
        //no show
            !advanceOptionBtnBox.classList.contains('hidden') ? advanceOptionBtnBox.classList.add('hidden'): null   
            let c = advancesOptionBox.classList;
            if(c.contains('hidden'))
                {   
                    advanceOptionBtn.innerHTML = "show advance options";
                    c.remove('hidden');
                }
            else {
                    advanceOptionBtn.innerHTML = "hide advance options";
                    c.add('hidden');
                }
            advancesOptionBox.classList.add('hidden')
}else if(scanTypeVal==='grabber'){
    document.getElementById('f1').innerHTML="--sql";
    document.getElementById('f2').innerHTML="--xss";
    document.getElementById('f3').innerHTML="-c";
    document.getElementById('f4').innerHTML="-e";
    document.getElementById('f5').innerHTML="-tT";


    document.getElementById('chkbx1').value="--sql";
    document.getElementById('chkbx2').value="--xss";
    document.getElementById('chkbx3').value="-c";
    document.getElementById('chkbx4').value="-e";
    document.getElementById('chkbx5').parentNode.parentNode.classList.add('hidden');
    advanceOptionBtnBox.classList.contains('hidden') ? advanceOptionBtnBox.classList.remove('hidden'): null

}
}else{
    // this block will execute if selection list value is nil
    !advanceOptionBtnBox.classList.contains('hidden') ? advanceOptionBtnBox.classList.add('hidden'): console.log(scanTypeVal);   
}
});


var images1=[
    "/static/images/1.png",
    "/static/images/2.png",
    "/static/images/3.png",
    "/static/images/4.png",
    "/static/images/5.png"];

var i=0;
function slides(){
    document.getElementById("slideimage").src=images1[i];
    if(i<(images1.length-1)){
        i++;
    }else{
        i=0;
    }

}
setInterval(slides,4000);

function ABCD(c){
    var t = document.getElementById("flagValues");
    if(c.checked == true)
        t.value += c.value + ' ';
    else{
      t.value =   t.value.replace(c.value,"");
    }
}

// var info= {url:"https://www.youtube.com/watch?v=UDDMYw_IZnE", tools:['XSS','Nmap','Whois','SQL'],flags:['-o','-sS','-C','-sV','-sT']};

// const $ = node => document.querySelector(node)
const getNode = type => document.createElement(type)
const getTextNode = text => document.createTextNode(text)

const _form = $('#vaptForm')
_form.on('submit', sendData)


function sendData(event){
    event.preventDefault()
    const _this = event.target
    console.log($(_this).serialize());
    // debugger
    $.ajax({
        type: "POST",
        url: "/getAnalysisReport",
        data: $(_this).serialize(),
        success: function(res){
            console.log(res);
            // debugger
            const mainContainer = $('.main-container')
            const output = getNode('div')
            output.className = 'output-container'
            const title = getNode('p')
            title.className = 'title'

            title.append(getTextNode(_this['scanType'].value + ' scan report'))
            output.append(title)

            const txtContainer = getNode('div')
            txtContainer.className = 'output-text'

            const code = getNode('code')
            const pre = getNode('pre')

            pre.append(getTextNode(res))
            code.append(pre)

            txtContainer.append(code)
            output.append(txtContainer)

            mainContainer.append(output)
        },
        error: function(err){
            console.log(err);
        }
    }).done(function(){
        console.log("ajax request finish");
    });
    return false;sC
}

// let _url=" ";
        // let _ScanType=[];
        // let _flags=[];
        // let obj={url: _url, ScanType: _ScanType, flags:_flags};
        