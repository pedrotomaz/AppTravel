﻿namespace AppTravel.Common
{
    public class ErrorResponse
    {
        public int Status { get; set; }
        public string Error { get; set; }
        public string Message { get; set; }
        public string DevMessage { get; set; }
    }
}
