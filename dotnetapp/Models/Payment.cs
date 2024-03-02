using System;
using System.Collections.Generic;

namespace dotnetapp.Models;
public class Payment
{
    public int PaymentID  { get; set; }
    public int CourseId  { get; set; }
    public string UserName  { get; set; }
    public string Status  { get; set; }
    public int TotalAmount  { get; set; }
    public DateTime PaymentDate  { get; set; }
     public string ModeOfPayment  { get; set; }

}
