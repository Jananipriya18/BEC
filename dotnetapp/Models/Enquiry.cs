using System;
using System.Collections.Generic;

namespace dotnetapp.Models;
public class Enquiry
{
    public int EnquiryID  { get; set; }
    public DateTime EnquiryDate  { get; set; }
    public string userId { get; set; }
    public string Title  { get; set; } //Title getting the course name so course ID not required
    public string Description  { get; set; }
    public string EmailID  { get; set; }
    public string EnquiryType  { get; set; }
   public string Status { get; set; }

}