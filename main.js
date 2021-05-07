var ipField = document.getElementById("ip_value");
// var table =document.getElementById("myTable");
var ip_status= document.getElementById("ip_status");
var table = $('#myTable').DataTable({
    // iDisplayLength: 15,   // number of rows to display
    columns: [
        { title: 'ip' },
        { title: 'country code' },
        { title: 'country name' },
        { title: 'action' },]
});

function validateIPaddress()
{
    console.log("in validate ip adrress");
    var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if(ipField.value.match(ipformat))
    {
        ipField.focus();
        getDetails();
    }
    else
    {
        ip_status.textContent="You have entered an invalid IP address!";
        ip_status.style.color="red";
    }
}
function getDetails()
{
console.log(ipField.value);
    $.get('https://freegeoip.app/json/'+ipField.value, function (data, textStatus, jqXHR) {
        console.log(data);
        var x=JSON.stringify(data)
        // console.log(x);
        var y = JSON.parse(x);
        // console.log(y);
        table.row.add([y.ip,y.country_code,y.country_name,document.innerHtml='<button class="btn-delete" id="deleteRow" type="button">Delete</button>']).draw();

        $('#myTable').on('click', '#deleteRow', function (e) {
            // e.preventDefault();
            table.row($(this).parents('tr')).remove().draw();
        });

    });





}

